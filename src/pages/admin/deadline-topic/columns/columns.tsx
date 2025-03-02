import { ColumnDef } from "@tanstack/react-table";
import { SubmissionRound } from "@/types/deadline-topic";

import { Action } from "./action";

export const columns: ColumnDef<SubmissionRound>[] = [
  {
    accessorKey: "round_number",
    header: "Lần nộp",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "start_date",
    header: "Ngày bắt đầu",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "end_date",
    header: "Ngày kết thúc",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <Action round={row.original} />,
  },
];
