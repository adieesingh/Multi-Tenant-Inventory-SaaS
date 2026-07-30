import { AppSideBar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* 1. Sidebar hamesha Provider ke andar pehle aayega */}
      <AppSideBar />

      {/* 2. SidebarInset poore right-side (Navbar + Main Content) ko containerize karta hai */}
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}