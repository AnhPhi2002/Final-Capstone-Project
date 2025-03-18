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
    accessorFn: (row) => row.status, 
    header: "Trạng thái",
    cell: ({ getValue }) => {
      const status = getValue<string>() as "ACTIVE" | "COMPLETE" | "UPCOMING";
  
      const statusClasses: { [key in "ACTIVE" | "COMPLETE" | "UPCOMING"]: string } = {
        "ACTIVE": "bg-green-100 text-green-600 hover:bg-green-200",
        "COMPLETE": "bg-blue-100 text-blue-600 hover:bg-blue-200",
        "UPCOMING": "bg-gray-100 text-gray-600 hover:bg-gray-200",
      };
  
      return (
        <Badge className={`${statusClasses[status] || "bg-gray-100 text-gray-600 hover:bg-gray-200"} px-2 py-1 rounded-md`}>
          {status}
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
