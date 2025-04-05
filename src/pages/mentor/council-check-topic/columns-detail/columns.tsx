import { ColumnDef } from "@tanstack/react-table";
import {  CouncilReviewSessions } from "@/lib/api/types"; // Thêm CouncilReviewSession vào types
import { Action } from "./action";

export const groupColumns: ColumnDef<CouncilReviewSessions>[] = [
  {
    accessorKey: "group.groupCode",
    header: "Mã nhóm",
  },
  {
    accessorKey: "topic.name",
    header: "Tên đề tài",
  },
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
  // {
  //   accessorKey: "assignments",
  //   header: "Điểm",
  //   cell: ({ row }) => {
  //     const assignments = row.original.assignments;
  //     return assignments && assignments.length > 0 && assignments[0].score !== null
  //     ? assignments[0].score
  //     : "Chưa chấm"
  //   }

  // }
  // ,
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <Action session={row.original} />, // Truyền toàn bộ session object
  },
];