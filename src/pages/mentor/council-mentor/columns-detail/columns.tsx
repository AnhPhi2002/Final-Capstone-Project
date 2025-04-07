// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilReviewSessions } from "@/lib/api/types";
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
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row, table }) => <Action session={row.original} table={table} />, // Truyền table vào Action
  },
];