import * as React from "react";
import Logo from "@/assets/images/img01.jpg";
import {
  BookUserIcon,
  Calendar1Icon,
  CalendarDaysIcon,
  // ChartPie,
  CircleUserRound,
  Cog,
  LayoutDashboardIcon,
  LightbulbIcon,

  ListCheckIcon,
  SquareCheckBigIcon,
  SquareEqualIcon,
  StampIcon,
  TvMinimalIcon,
  // NotebookPen,
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
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";

// const data = {
//   navMain: [
//     {
//       title: "Tổng quan",
//       url: "/dashboard",
//       icon: ChartPie,
//       isActive: true,
//       items: [
//         {
//           title: "Dashboard",
//           url: "/dashboard",
//         },
//       ],
//     },
//     {
//       title: "Năm học và kỳ ",
//       url: "/semester",
//       icon: Calendar,
//       isActive: true,
//       items: [
//         {
//           title: "D.s năm học ",
//           url: "/year-semester",
//         },
//         {
//           title: "D.s học kỳ ",
//           url: "/semester",
//         },
//         {
//           title: "D.s hạn nộp đề tài",
//           url: "/deadline-topic",
//         },
//         {
//           title: "D.s review ",
//           url: "/review-semester",
//         },
//       ],
//     },
//     {
//       title: "Cán bộ nghiệp vụ",
//       url: "/council-member",
//       icon: List,
//       isActive: true,
//       items: [
//         {
//           title: "D.s sinh viên KLTN ",
//           url: "/student",
//         },
//         {
//           title: "D.s nhóm KLTN",
//           url: "/group-student",
//         },
//         {
//           title: "D.s chưa có nhóm KLTN",
//           url: "/not-group-student",
//         },
//         {
//           title: "D.s hội chấm KLTN",
//           url: "/council-member",
//         },
//         {
//           title: "D.s g.v hướng dẫn KLTN",
//           url: "/mentor-page",
//         },
//         {
//           title: "D.s h.đ xét duyệt đề tài",
//           url: "/review-topic-council",
//         },
//       ],
//     },
//     {
//       title: "Review nhóm sinh viên ",
//       url: "/review-group-student",
//       icon: NotebookPen,
//       isActive: true,
//       items: [
//         {
//           title: "Review ",
//           url: "/review-group-student",
//         },
//       ],
//     },
//     {
//       title: "Sinh viên",
//       url: "/topic-student",
//       icon: NotebookPen,
//       isActive: true,
//       items: [
//         {
//           title: "D.s đề tài sinh viên",
//           url: "/topic-student",
//         },
//       ],
//     },
//     {
//       title: "Đề tài ",
//       url: "/topic",
//       icon: ClipboardList,
//       isActive: true,
//       items: [
//         {
//           title: "Import đề tài",
//           url: "/import-topic-mentor",
//         },
//         {
//           title: "Đề tài ",
//           url: "/topic",
//         },
//       ],
//     },
//     {
//       title: "Phê duyệt đề tài nhóm ",
//       url: "/topic",
//       icon: ClipboardList,
//       isActive: true,
//       items: [
//         {
//           title: "Phê duyệt",
//           url: "/approve-topic",
//         },
//       ],
//     },
//     {
//       title: "Xét duyệt đề tài",
//       url: "/review-topic-page",
//       icon: ClipboardList,
//       isActive: true,
//       items: [
//         {
//           title: "Xét duyệt đề tài ",
//           url: "/review-topic-page",
//         },
//       ],
//     },

//     {
//       title: "Người dùng ",
//       url: "/user",
//       icon: CircleUserRound,
//       isActive: true,
//       items: [
//         {
//           title: "Tài khoản",
//           url: "/user",
//         },
//         {
//           title: "Hội đồng xét duyệt",
//           url: "",
//         },
//         {
//           title: "Hội đồng review",
//           url: "",
//         },
//         {
//           title: "Giảng viên hướng dẫn",
//           url: "",
//         },
//         {
//           title: "Sinh viên",
//           url: "",
//         },
//       ],
//     },
//     {
//       title: "Admin config",
//       url: "/admin-config",
//       icon: CircleUserRound,
//       isActive: true,
//       items: [
//         {
//           title: "Cấu hình",
//           url: "/admin-config",
//         },
//       ],
//     },
//   ],
// };
const adminMenu = {
  navMain: [
    {
      title: "Admin config",
      url: "/admin/admin-config",
      icon: Cog,
      isActive: true,
      items: [
        {
          title: "Cấu hình",
          url: "/admin/admin-config",
        },
        {
          title: "Thống kê",
          url: "/admin/dashboard-page",
        },
      ],
    },
    {
      title: "Người dùng ",
      url: "/admin/user",
      icon: CircleUserRound,
      isActive: true,
      items: [
        {
          title: "Tài khoản",
          url: "/admin/user-page",
        },
      ],
    },
  ],
};
const lecturerMenu = {
  navMain: [
    {
      title: "Quản lý sinh viên ",
      url: "/lecturer/council-member",
      icon: ListCheckIcon,
      isActive: true,
      items: [
        {
          title: "D.s nhóm KLTN",
          url: "/lecturer/group-student",
        },
      ],
    },
    {
      title: "Quản lý đề tài",
      url: "/lecturer/council-member",
      icon: LightbulbIcon,
      isActive: true,
      items: [
        {
          title: "Ds. đề tài ",
          url: "/lecturer/topic",
        },
        {
          title: "G.V hướng dẫn duyệt cho nhóm",
          url: "/lecturer/approve-topic",
        },
        {
          title: "Đề tài chờ xét duyệt",
          url: "/lecturer/review-topic-page",
        },
        {
          title: "Đề tài đã xét duyệt",
          url: "/lecturer/topic-approved",
        },
      ],
    },
    {
      title: "Quản lý phòng họp",
      url: "/lecturer/council-member",
      icon: TvMinimalIcon,
      isActive: true,
      items: [
        {
          title: "D.s phòng họp",
          url: "/lecturer/meeting",
        },
      ],
    },
    {
      title: "Hội đồng",
      url: "/lecturer/council-member",
      icon: CalendarDaysIcon,
      isActive: true,
      items: [
        {
          title: "Hội đồng xét duyệt",
          url: "/lecturer/council-check",
        },
        {
          title: "Hội đồng kiểm tra",
          url: "/lecturer/council-review",
        },
        {
          title: "Hội đồng bảo vệ",
          url: "/lecturer/council-defense",
        },
      ],
    },
    {
      title: "Quản lý nhóm làm đồ án",
      url: "/lecturer/council-member",
      icon: SquareEqualIcon,
      isActive: true,
      items: [
        {
          title: "Hội đồng kiểm tra",
          url: "/lecturer/check-review",
        },
        {
          title: "Hội đồng bảo vệ",
          url: "/lecturer/check-defense",
        },
        {
          title: "Quyết định bảo vệ",
          url: "/lecturer/decision-defense",
        },
        {
          title: "Báo cáo tiến độ",
          url: "/lecturer/progress-report-mentor",
        },
      ],
    },
    // {
    //   title: "Qlý. phân công đề tài",
    //   url: "/lecturer/topic-assignment-decision",
    //   icon: List,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Ds. quyết định",
    //       url: "/lecturer/topic-assignment-decision",
    //     },
    //   ],
    // },

     {
      title: "Bảng quyết định",
      url: "/lecturer/decision",
      icon: StampIcon,
      isActive: true,
      items: [
        {
          title: "D.s quyết định g.v hướng dẫn",
          url: "/lecturer/decision",
        },
      ],
    },
  ],
};
const examinationMenu = {
  navMain: [
    {
      title: "Danh sách sinh viên",
      url: "/examination/council-member",
      icon: ListCheckIcon,
      isActive: true,
      items: [
        {
          title: "Danh sách sinh viên KLTN",
          url: "/examination/student",
        },
        {
          title: "Danh sách giảng viên",
          url: "/examination/mentor-page",
        },
      ],
    },
    {
      title: "Quản lý đề tài xét duyệt",
      url: "/examination/council-member",
      icon: CalendarDaysIcon,
      isActive: true,
      items: [
        {
          title: "Quản lý thời gian",
          url: "/examination/deadline-topic",
        },
        {
          title: "Đề tài chờ xét duyệt",
          url: "/examination/review-topic-page",
        },
        {
          title: "Đề tài đã xét duyệt",
          url: "/examination/topic",
        },
      ],
    },
    {
      title: "Quản lý hội đồng KLTN",
      url: "/examination/review-topic-council",
      icon: BookUserIcon,
      isActive: true,
      items: [
        {
          title: "D.s h.đ xét duyệt đề tài",
          url: "/examination/review-topic-council",
        },
        {
          title: "D.s h.đ bảo vệ đồ án ",
          url: "/examination/council-defense",
        },
      ],
    },
    {
      title: "Bảng quyết định",
      url: "/examination/decision",
      icon: StampIcon,
      isActive: true,
      items: [
        {
          title: "D.s quyết định g.v hướng dẫn",
          url: "/examination/decision",
        },
      ],
    },
  ],
};
const academicMenu = {
  navMain: [
    {
      title: "Năm học và kỳ ",
      url: "/academic/semester",
      icon: Calendar1Icon,
      isActive: true,
      items: [
        {
          title: "D.s năm học ",
          url: "/academic/year-semester",
        },
        {
          title: "D.s học kỳ ",
          url: "/academic/semester",
        },
      ],
    },
    {
      title: "Danh sách sinh viên ",
      url: "/academic/council-member",
      icon: ListCheckIcon,
      isActive: true,
      items: [
        {
          title: "D.s sinh viên KLTN ",
          url: "/academic/student",
        },
        {
          title: "D.s nhóm KLTN",
          url: "/academic/group-student",
        },
        {
          title: "D.s chưa có nhóm KLTN",
          url: "/academic/not-group-student",
        },
        {
          title: "D.s giảng viên",
          url: "/academic/mentor-page",
        },
        {
          title: "Q.l liên ngành",
          url: "/academic/inter-major",
        },
      ],
    },
    {
      title: "Quản lý đề tài",
      url: "/academic/council-member",
      icon: LightbulbIcon,
      isActive: true,
      items: [
        {
          title: "D.s đề tài",
          url: "/academic/topic",
        },
      ],
    },

    {
      title: "Bảng quyết định",
      url: "/academic/decision",
      icon: StampIcon,
      isActive: true,
      items: [
        {
          title: "D.s quyết định g.v hướng dẫn",
          url: "/academic/decision",
        },
      ],
    },
    {
      title: "Quản lý thống kê",
      url: "/academic/dashboard-page",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        {
          title: "Thống kê ",
          url: "/academic/dashboard-page",
        },
      ],
    },
  ],
};
const studentMenu = {
  navMain: [
    {
      title: "Danh sách sinh viên ",
      url: "/student/council-member",
      icon: ListCheckIcon,
      isActive: true,
      items: [
        {
          title: "D.s nhóm KLTN",
          url: "/student/group-student",
        },
        {
          title: "D.s chưa có nhóm KLTN",
          url: "/student/not-group-student",
        },
        {
          title: "Nhóm bảo vệ",
          url: "/student/group-student-defense",
        },
      ],
    },
    {
      title: "Đề tài",
      url: "/student/council-student",
      icon: LightbulbIcon,
      isActive: true,
      items: [
        // {
        //   title: "Danh sách đề tài có thể đăng ký",
        //   url: "/student/topic-student",
        // },
        {
          title: "Toàn bộ đề tài",
          url: "/student/all-topics-student",
        },
        {
          title: "Đề tài nhóm đăng ký",
          url: "/student/topic-group-register-detail",
        },
      ],
    },
    {
      title: "Phòng",
      url: "/student/council-member",
      icon: TvMinimalIcon,
      isActive: true,
      items: [
        {
          title: "Lịch họp",
          url: "/student/meeting-student",
        },
        {
          title: "Phòng kiểm tra",
          url: "/student/review-student",
        },
        {
          title: "Phòng Bảo vệ",
          url: "/student/review-defense",
        },
      ],
    },
    {
      title: "Báo cáo tiến độ",
      url: "/student/council-member",
      icon: SquareCheckBigIcon,
      isActive: true,
      items: [
        {
          title: "Báo cáo",
          url: "/student/progress-report",
        },
      ],
    },
  ],
};
const graduationThesisMenu = {
  navMain: [
    {
      title: "Quản lý thời gian hội đồng",
      url: "/graduation-thesis/council-member",
      icon: CalendarDaysIcon,
      isActive: true,
      items: [
        {
          title: "Quản lý thời gian",
          url: "/graduation-thesis/deadline-topic",
        },
      ],
    },
    {
      title: "Quản lý hội chấm KLTN",
      url: "/graduation-thesis/review-topic-council",
      icon: BookUserIcon,
      isActive: true,
      items: [
        {
          title: "D.s h.đ kiểm tra đồ án ",
          url: "/graduation-thesis/council-review",
        },
        {
          title: "D.s h.đ bảo vệ đồ án ",
          url: "/graduation-thesis/council-defense",
        },
      ],
    },

    {
      title: "Bảng quyết định",
      url: "/graduation-thesis/decision",
      icon: StampIcon,
      isActive: true,
      items: [
        {
          title: "D.s quyết định g.v hướng dẫn",
          url: "/graduation-thesis/decision",
        },
      ],
    },
    {
      title: "Quản lý thống kê",
      url: "/graduation-thesis/dashboard-page",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        {
          title: "Thống kê ",
          url: "/graduation-thesis/dashboard-page",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector((state: RootState) => state.auth.user);

  const currentRole = useSelector((state: RootState) => state.auth.currentRole); // 🔥

  // console.log("user", user);
  const formattedUser = user
    ? {
        name: user.fullName || user.username || "Người dùng",
        email: user.email,
        avatar: user.avatar || "/default-avatar.png",
      }
    : null;

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
        {currentRole === "admin" && <NavMain items={adminMenu.navMain} />}
        {currentRole === "academic_officer" && (
          <NavMain items={academicMenu.navMain} />
        )}
        {currentRole === "graduation_thesis_manager" && (
          <NavMain items={graduationThesisMenu.navMain} />
        )}
        {currentRole === "student" && <NavMain items={studentMenu.navMain} />}
        {currentRole === "lecturer" && <NavMain items={lecturerMenu.navMain} />}
        {currentRole === "examination_officer" && (
          <NavMain items={examinationMenu.navMain} />
        )}
      </SidebarContent>
      <SidebarFooter>
        {formattedUser ? <NavUser user={formattedUser} /> : <p>Đang tải...</p>}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
