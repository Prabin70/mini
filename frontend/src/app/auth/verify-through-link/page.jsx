"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../config/env";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        const res = await axios.get(`${baseUrl}/users/verify-through-link`, {
          params: { email, code, token },
        });
        if (res.status === 200) {
          setMessage("Email verified successfully! You can now login.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        } else {
          setError("Verification failed. Please try again.");
        }
      } catch (err) {
        setError("Verification failed. Please try again.");
      }
    }

    if (email && code && token) {
      verify();
    } else {
      setError("Invalid verification link.");
    }
  }, [email, code, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default Page;