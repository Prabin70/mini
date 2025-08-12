import { Arimo } from "next/font/google";
import "../globals.css";
import Sidebar from "@/app/(main)/components/Sidebar";
import ProtectedRoute from "./components/ProctedRoutes";

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
});

export const metadata = {
  title: "Admin Dashboard",
  description: "A modern admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${arimo.variable} font-sans antialiased bg-gray-900`}>
        <ProtectedRoute>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </ProtectedRoute>
      </body>
    </html>
  );
}
