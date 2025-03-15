import { ColumnDef } from "@tanstack/react-table";
import { TopicAssignmentDecisionDetail } from "@/types/TopicAssignmentDecisionDetail";

export const columns: ColumnDef<TopicAssignmentDecisionDetail>[] = [
  {
    accessorKey: "id",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Họ và tên",
    cell: ({ row }) => <div>{row.original.fullName}</div>,
  },
  {
    accessorKey: "specialty",
    header: "Chuyên môn",
    cell: ({ row }) => <div>{row.original.specialty}</div>,
  },
  {
    accessorKey: "department",
    header: "Bộ phận",
    cell: ({ row }) => <div>{row.original.department}</div>,
  },
];