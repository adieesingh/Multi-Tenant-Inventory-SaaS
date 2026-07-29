
import { AppSideBar } from "@/components/ui/app-sidebar";
import {  SidebarProvider } from "@/components/ui/sidebar";
import  { ReactNode } from "react";

export default function DashboardLayout({children}:{children:ReactNode}){
    return (
        <SidebarProvider>
      <AppSideBar/>
      <main className="p-6 ">{children}</main>
    </SidebarProvider>

    )
}