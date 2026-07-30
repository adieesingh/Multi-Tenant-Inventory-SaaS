"use client"
import { Boxes, LayoutGrid, Truck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const items = [
  {
    title: "categories",
    icon: LayoutGrid,
    href: "/categories",
  },
  {
    title: "products",
    href: "/products",
    icon: Boxes,
  },
  {
    title: "suppliers",
    href: "/suppliers",
    icon: Truck,
  },
];

export function AppSideBar() {
const pathname = usePathname();
const router = useRouter()
  return (
    <Sidebar className="bg-slate-900 text-slate-200 ">
      <SidebarHeader className="text-xl font-bold px-6 py-6 ">
        StockFlow
      </SidebarHeader>
      <SidebarContent >
        <SidebarGroup >
        <SidebarMenu >
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                                                                           
              isActive={pathname === item.href}>
                <Link href={item.href} className="flex items-center gap-4 w-full px-4">
                  <item.icon className="h-5 w-full " />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem> 
          ))}
        </SidebarMenu>
        </SidebarGroup >
      </SidebarContent>
    </Sidebar>
  );
}
