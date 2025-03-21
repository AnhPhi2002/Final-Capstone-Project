// src/components/columns/columns.ts
import { ColumnDef } from "@tanstack/react-table";

import { Mentor } from "@/lib/api/types";

export const columns: ColumnDef<Mentor>[] = [
  {
    accessorKey: "STT",
    header: "STT",
    cell: ({ row }) => row.index + 1,
    meta: { className: "text-center" }, 
  },
  {
    accessorKey: "fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "departmentPosition",
    header: "Bộ môn",
  },
  {
    accessorKey: "department",
    header: "Chuyên môn",
  },
];