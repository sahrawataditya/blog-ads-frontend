"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = typeof window !== "undefined" ? Cookies.get("token") : undefined;
  const role = typeof window !== "undefined" ? Cookies.get("role") : undefined;

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between max-w-[1290px] mx-auto p-4">
      <Link href="/" className="text-xl font-bold">
        BlogApp
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {!token ? (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <>
            {role === "admin" && (
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
            )}
            <button onClick={handleLogout} className="hover:underline cursor-pointer">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
