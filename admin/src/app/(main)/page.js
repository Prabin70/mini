import { redirect } from "next/navigation";

export default function Page() {
  const isLoggedIn = localStorage.getItem("token");

  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/");
  }
}

return <div>Please login first</div>;
