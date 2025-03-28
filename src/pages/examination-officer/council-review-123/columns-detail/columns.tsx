import { ColumnDef } from "@tanstack/react-table";
import { CouncilReviewMember, CouncilReviewSessions } from "@/lib/api/types"; // Thêm CouncilReviewSession vào types

// export const memberColumns: ColumnDef<CouncilReviewMember>[] = [
//   {
//     accessorKey: "user.fullName",
//     header: "Họ và tên",
//   },
//   {
//     accessorKey: "user.email",
//     header: "Email",
//   },
//   {
//     accessorKey: "roleName",
//     header: "Vai trò",
//   },
//   {
//     accessorKey: "status",
//     header: "Trạng thái",
//   },
// ];

export const groupColumns: ColumnDef<CouncilReviewSessions>[] = [
  {
    accessorKey: "group.groupCode",
    header: "Mã nhóm",
  },
  // {
  //   accessorKey: "topic.name",
  //   header: "Tên đề tài",
  // },
  // {
  //   accessorKey: "topic.",
  //   header: "Tên đề tài",
  // },
  {
    accessorKey: "reviewTime",
    header: "Thời gian review",
    cell: ({ row }) => new Date(row.original.reviewTime).toLocaleString(),
  },
  {
    accessorKey: "room",
    header: "Phòng",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
];