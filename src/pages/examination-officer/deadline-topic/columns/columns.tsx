import { ColumnDef } from "@tanstack/react-table";
import { SubmissionRound } from "@/lib/api/types";
import { Action } from "./action";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<SubmissionRound, any>[] = [ 
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.index + 1}</span>, 
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorFn: (row) => row.startDate, 
    header: "Ngày bắt đầu",
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return date ? new Intl.DateTimeFormat("vi-VN").format(new Date(date)) : "Không xác định";
    },
  },
  {
    accessorFn: (row) => row.endDate,
    header: "Ngày kết thúc",
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return date ? new Intl.DateTimeFormat("vi-VN").format(new Date(date)) : "Không xác định";
    },
  },
  {
    accessorKey: "type",
    header: "Loại",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as "ACTIVE" | "UPCOMING" | "COMPLETE";
  
      return (
        <Badge
          className={
            status === "ACTIVE"
              ? "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200"
              : status === "UPCOMING"
              ? "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200"
              : status === "COMPLETE"
              ? "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200"
              : "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
          }
        >
          {status === "ACTIVE"
            ? "Đang hoạt động"
            : status === "UPCOMING"
            ? "Sắp diễn ra"
            : status === "COMPLETE"
            ? "Hoàn thành"
            : "Không xác định"}
        </Badge>
      );
    },
  },
  
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <Action round={row.original} />,
  },
];
