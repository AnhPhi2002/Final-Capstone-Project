import * as React from "react";
import {
  ChartPie,
  CircleUserRound,
  RectangleEllipsis,
  Store,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tổng quan",
      url: "/dashboard",
      icon: ChartPie,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Cán bộ nghiệp vụ",
      url: "/council-member",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "D.s sinh viên KLTN ",
          url: "/student",
        },
        {
          title: "D.s nhóm KLTN",
          url: "/group-student",
        },
        {
          title: "D.s hội đồng đánh giá ",
          url: "/council-member",
        },
      
      ],
    },
    {
      title: "Hội đồng đánh giá ",
      url: "/product",
      icon: Store,
      isActive: true,
      items: [
        // {
        //   title: "Hội đồng đánh giá ",
        //   url: "/product",
        // },
        {
          title: "Đánh giá đợi 1 ",
          url: "/order",
        },
        {
          title: "Đánh giá đợi 2 ",
          url: "/category",
        },
        {
          title: "",
          url: "/brand",
        },
  
      ],
    },
    {
      title: "Tai khoan",
      url: "/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
        {
          title: "Hội đồng xét duyệt",
          url: "/category",
        },
        {
          title: "Hội đồng review",
          url: "/category",
        },
        {
          title: "Giảng viên hướng dẫn",
          url: "/category",
        },
        {
          title: "Sinh viên",
          url: "/category",
        },
      ],
    },
    {
      title: "Hội đồng xét duyệt",
      url: "/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
      
      ],
    },
    {
      title: "Hội đồng review",
      url: "/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
   
      ],
    },
    {
      title: "Giảng viên hướng dẫn ",
      url: "/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
    
      ],
    },
    {
      title: "Sinh viên",
      url: "/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
     
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: RectangleEllipsis,
      items: [
        {
          title: "Tài khoản",
          url: "/user",
        },
      ],
    },
    {
      title: "test",
      url: "/council-member",
      icon: CircleUserRound,
      isActive: true,
      items: [
        {
          title: "D.s hội đồng đánh giá ",
          url: "/council-member",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-700 text-sidebar-primary-foreground">
              <img src="/electric-guitar.png" className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Innovibe</span>
              <span className="truncate text-xs">OMS</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
