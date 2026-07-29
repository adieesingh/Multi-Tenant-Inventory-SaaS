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
    <Sidebar>
      <SidebarHeader className="text-xl font-bold px-4 py-4 ">
        StockFlo
      </SidebarHeader>
      <SidebarContent className="flex ">
        <SidebarGroup />
        <SidebarMenu >
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                                                                            
              isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}
