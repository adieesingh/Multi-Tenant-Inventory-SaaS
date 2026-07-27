"use client"
import { Boxes, LayoutGrid, Sidebar, Truck } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const router = useRouter()
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
  return (
    <Sidebar>
      <SidebarHeader className="text-xl font-bold px-4 py-4">
        StockFlow
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
              asChild
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
