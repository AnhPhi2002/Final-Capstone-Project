import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge";
import { Action } from "./action";
import { GroupWithDetails } from "@/lib/api/types";

export const columns: ColumnDef<GroupWithDetails>[] = [
  {
    accessorKey: "group.groupCode",
    header: "Mã Nhóm",
  },
  {
    header: "Giảng Viên 1",
    accessorFn: (row) => {
      const mainMentor = row.mentors.find((mentor) => mentor.role === "mentor_main");
      return mainMentor ? mainMentor.email : "N/A";
    },
  },
  {
    header: "Giảng Viên 2",
    accessorFn: (row) => {
      const subMentor = row.mentors.find((mentor) => mentor.role === "mentor_sub");
      return subMentor ? subMentor.email : "N/A";
    },
  },
  // {
  //   accessorKey: "group.status",
  //   header: "Trạng Thái",
  //   cell: ({ row }) => {
  //     const status = row.original.group.status;
  //     const badgeClass = {
  //       ACTIVE: "bg-green-100 text-green-500",
  //       PENDING: "bg-yellow-100 text-yellow-500",
  //       INACTIVE: "bg-red-100 text-red-500",
  //     }[status] || "bg-gray-100 text-gray-500";

  //     const statusText = {
  //       ACTIVE: "Đang Hoạt Động",
  //       PENDING: "Chờ Xử Lý",
  //       INACTIVE: "Ngừng Hoạt Động",
  //     }[status] || status;

  //     return <Badge className={badgeClass}>{statusText}</Badge>;
  //   },
  // },
  // {
  //   header: "Số Thành Viên Hiện Tại",
  //   accessorFn: (row) => row.members.length,
  // },
  // {
  //   accessorKey: "group.isMultiMajor",
  //   header: "Liên Ngành",
  //   cell: ({ row }) => (
  //     <Badge className={row.original.group.isMultiMajor ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}>
  //       {row.original.group.isMultiMajor ? "Có" : "Không"}
  //     </Badge>
  //   ),
  // },
  {
    header: "Đợt bảo vệ",
    accessorFn: (row) => {
      const defenseRound = row.topicAssignments[0]?.defenseRound;
      return defenseRound !== null && defenseRound !== undefined ? defenseRound : "N/A";
    },
  },
  {
    header: "Trạng thái bảo vệ",
    accessorFn: (row) => {
      const defendStatus = row.topicAssignments[0]?.defendStatus;
      if (defendStatus === "CONFIRMED") {
        return "Đã xác nhận";
      } else if (defendStatus === "UN_CONFIRMED") {
        return "Chưa xác nhận";
      }
      return "N/A"; 
    },
  },
  // {
  //   accessorKey: "group.isMultiMajor",
  //   header: "Liên Ngành",
  //   cell: ({ row }) => (
  //     <Badge className={row.original.group.isMultiMajor ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}>
  //       {row.original.group.isMultiMajor ? "Có" : "Không"}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: "group.createdAt",
    header: "Ngày Tạo",
    cell: ({ row }) => new Date(row.original.group.createdAt).toLocaleString(),
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <Action group={row.original.group} />,
  },
];
