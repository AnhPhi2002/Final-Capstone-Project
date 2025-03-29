import * as React from "react";
import Logo from "@/assets/images/img01.jpg";
import {
  Calendar,
  // ChartPie,
  CircleUserRound,
  // ClipboardList,
  List,
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
      icon: CircleUserRound,
      isActive: true,
      items: [
        {
          title: "Cấu hình",
          url: "/admin/admin-config",
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
          url: "/admin/user",
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
      icon: List,
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
      icon: List,
      isActive: true,
      items: [
        {
          title: "Ds. đề tài ",
          url: "/lecturer/topic",
        },
        {
          title: "Ds. phê duyệt đề tài ",
          url: "/lecturer/approve-topic",
        },
      ],
    },
    {
      title: "Quản lý phòng họp",
      url: "/lecturer/council-member",
      icon: List,
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
      icon: List,
      isActive: true,
      items: [
        {
          title: "Hội đồng review",
          url: "/lecturer/council-review",
        },
      ],
    },
    {
      title: "Quản lý nhóm làm đồ án",
      url: "/lecturer/council-member",
      icon: List,
      isActive: true,
      items: [
        {
          title: "Hội đồng review",
          url: "/lecturer/check-review",
        },
      ],
    }
  ],
};
const examinationMenu = {
  navMain: [
    {
      title: "Quản lý đề tài xét duyệt",
      url: "/examination/council-member",
      icon: List,
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
        }
      ],
    },
    {
      title: "Quản lý hội chấm KLTN",
      url: "/examination/review-topic-council",
      icon: List,
      isActive: true,
      items: [
        {
          title: "D.s hội chấm KLTN",
          url: "/examination/review-topic-council",
        },
        {
          title: "D.s hội chấm Review-Topic",
          url: "/examination/council-review",
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
      icon: Calendar,
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
      icon: List,
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
        // {
        //   title: "D.s nhóm sinh viên ngẫu nhiên ",
        //   url: "/academic/random-group-student-page",
        // },
      ],
    },
    {
      title: "Quản lý đề tài",
      url: "/academic/council-member",
      icon: List,
      isActive: true,
      items: [
        {
          title: "D.s đề tài",
          url: "/academic/topic",
        },
      ],
    },
    {
      title: "Qlý. phân công đề tài",
      url: "/academic/topic-assignment-decision",
      icon: List,
      isActive: true,
      items: [
        {
          title: "Ds. quyết định",
          url: "/academic/topic-assignment-decision",
        },
      ],
    },
    {
      title: "Bảng quyết định",
      url: "/academic/decision",
      icon: List,
      isActive: true,
      items: [
        {
          title: "D.s quyết định",
          url: "/academic/decision",
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
      icon: List,
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
      ],
    },
    {
      title: "Đề tài",
      url: "/student/council-student",
      icon: List,
      isActive: true,
      items: [
        {
          title: "Danh sách đề tài có thể đăng ký",
          url: "/student/topic-student",
        },
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
      icon: List,
      isActive: true,
      items: [
        {
          title: "Lịch họp",
          url: "/student/meeting-student",
        },
        {
          title: "Phòng Review",
          url: "/student/review-student",
        },
      ],
    },
  ],
};
const graduationThesisMenu = {
  navMain: [
    {
      title: "Danh sách sinh viên ",
      url: "/student/council-member",
      icon: List,
      isActive: true,
      items: [
        {
          title: "D.s hội chấm KLTN",
          url: "/council-member",
        },
        {
          title: "D.s g.v hướng dẫn KLTN",
          url: "/mentor-page",
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
        {currentRole === "academic_officer" && (<NavMain items={academicMenu.navMain} /> )}
        {currentRole === "graduation_thesis_manager" && (<NavMain items={graduationThesisMenu.navMain} />)}
        {currentRole === "student" && <NavMain items={studentMenu.navMain} />}
        {currentRole === "lecturer" && <NavMain items={lecturerMenu.navMain} />}
        {currentRole === "examination_officer" && ( <NavMain items={examinationMenu.navMain} />)}
      </SidebarContent>
      <SidebarFooter>
        {formattedUser ? <NavUser user={formattedUser} /> : <p>Đang tải...</p>}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
