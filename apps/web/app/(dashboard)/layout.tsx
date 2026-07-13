"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Package,
  ClipboardList,
  Truck,
  Receipt,
  ArrowLeftRight,
  Tags,
  BadgeCheck,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Sidebar, type NavSection } from "@repo/ui";
import { currentOrg, currentUser } from "@/lib/mock-data";

const sections: NavSection[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: <LayoutGrid size={16} /> }],
  },
  {
    label: "Catalog",
    items: [
      { label: "Products", href: "/products", icon: <Package size={16} /> },
      { label: "Categories", href: "/categories", icon: <Tags size={16} /> },
      { label: "Brands", href: "/brands", icon: <BadgeCheck size={16} /> },
    ],
  },
  {
    label: "Procurement",
    items: [
      { label: "Purchase orders", href: "/purchase-orders", icon: <ClipboardList size={16} /> },
      { label: "Suppliers", href: "/suppliers", icon: <Truck size={16} /> },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Sales", href: "/sales", icon: <Receipt size={16} /> },
      { label: "Stock movements", href: "/stock-movements", icon: <ArrowLeftRight size={16} /> },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        orgName={currentOrg.name}
        sections={sections}
        activeHref={pathname}
        LinkComponent={Link}
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        footer={
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[12px] font-medium text-white">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-white">{currentUser.name}</p>
              <p className="truncate text-[11px] text-white/40">{currentUser.role}</p>
            </div>
          </div>
        }
      />

      {/* Offsets content past the fixed sidebar at lg+; full width below that */}
      <div className="flex min-h-screen w-full flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setMobileNavOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-surface-100 lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div className="hidden text-[13px] text-ink-400 sm:block">
              {currentOrg.name} <span className="mx-1.5 text-ink-200">/</span>{" "}
              <span className="text-ink-600">Workspace</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-surface-100"
            >
              <Bell size={17} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-warn-500" />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-[13px] font-medium text-ink-600 hover:bg-surface-100">
              <span className="hidden sm:inline">{currentOrg.name}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">{children}</main>
      </div>
    </div>
  );
}