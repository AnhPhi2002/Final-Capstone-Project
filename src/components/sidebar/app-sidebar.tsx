import * as React from "react";
import Logo from "@/assets/images/img01.jpg";
import {
  Calendar,
  ChartPie,
  CircleUserRound,
  
  ClipboardList,
  
  List,
  
  NotebookPen,
  
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
      title: "Năm học và kỳ ",
      url: "/semester",
      icon: Calendar,
      isActive: true,
      items: [
        {
          title: "D.s năm học ",
          url: "/year-semester",
        },
        {
          title: "D.s học kỳ ",
          url: "/semester",
        },
      ],
    },
    {
      title: "Cán bộ nghiệp vụ",
      url: "/council-member",
      icon: List,
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
          title: "D.s chưa nhóm KLTN",
          url: "/not-group-student",
        },
        {
          title: "D.s hội đồng đánh giá ",
          url: "/council-member",
        },
        {
          title: "D.s g.v hướng dẫn",
          url: "/mentor-page",
        },
      ],
    },
    {
      title: "Review nhóm sinh viên ",
      url: "/review-group-student",
      icon: NotebookPen,
      isActive: true,
      items: [
        {
          title: "Review ",
          url: "/review-group-student",
        },
      ],
    },
    {
      title: "Đề tài ",
      url: "/topic",
      icon: ClipboardList,
      isActive: true,
      items: [
        {
          title: "Import đề tài",
          url: "/import-topic-mentor",
        },
        {
          title: "Đề tài ",
          url: "/topic",
        
        },
      ],
    },


    {
      title: "Người dùng ",
      url: "/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
       {
          title: "Tài khoản",
          url: "/user",
        },
        {
          title: "Hội đồng xét duyệt",
          url: "",
        },
        {
          title: "Hội đồng review",
          url: "",
        },
        {
          title: "Giảng viên hướng dẫn",
          url: "",
        },
        {
          title: "Sinh viên",
          url: "",
        },
      ],
    },
    // {
    //   title: "test",
    //   url: "/columns",
    //   icon: CircleUserRound,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "D.s hội đồng đánh giá ",
    //       url: "/columns",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-700 text-sidebar-primary-foreground">
              <img src={Logo} className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">FCPRIMS</span>
              <span className="truncate text-xs">HCMC FU</span>
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
