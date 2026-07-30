"use client";
import Link from "next/link";
import { SidebarTrigger } from "./sidebar";
import { Bell, UserCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const title =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname === "/products"
        ? "Products"
        : pathname === "/categories"
          ? "Categories"
          : pathname === "suppliers"
            ? "Suppliers"
            : "";

  return (
    <header className="w-full flex h-16 items-center justify-between border-b bg-white px-6">
      
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        {title && (
          <h1 className="hidden md:block text-lg font-semibold text-gray-800">
            {title}
          </h1>
        )}
      </div>

      {/* Middle section: Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/products"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Products
        </Link>
        <Link
          href="/suppliers"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Suppliers
        </Link>
      </div>

      {/* Right section: Icons */}
      <div className="flex items-center gap-3">
        <button className="rounded-md p-2 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <button className="rounded-full p-1 hover:bg-gray-100 transition-colors">
          <UserCircle2 className="h-8 w-8 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
