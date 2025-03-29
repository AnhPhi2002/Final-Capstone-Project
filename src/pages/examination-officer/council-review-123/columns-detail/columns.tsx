import { ColumnDef } from "@tanstack/react-table";
import {  CouncilReviewSessions } from "@/lib/api/types"; // Thêm CouncilReviewSession vào types


export const groupColumns: ColumnDef<CouncilReviewSessions>[] = [
  {
    accessorKey: "group.groupCode",
    header: "Mã nhóm",
  },
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