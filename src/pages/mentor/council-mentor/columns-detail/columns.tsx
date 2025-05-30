// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilReviewSessions } from "@/lib/api/types";
import { Action } from "./action";
import { Badge } from "@/components/ui/badge";

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
  cell: ({ row }) => {
    const status = row.getValue("status");
    switch (status) {
      case "PENDING":
        return <Badge className="text-gray-600 bg-gray-100">Đang chờ</Badge>;
      case "COMPLETED":
        return <Badge className="text-blue-600 bg-blue-100">Hoàn thành</Badge>;;
      case "ACTIVE":
        return <Badge className="text-green-600 bg-green-100">Đang hoạt động</Badge>;;
      default:
        return status;
    }
  },
},
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row, table }) => <Action session={row.original} table={table} />,
  },
];