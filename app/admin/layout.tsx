"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/posts", label: "Posts" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
