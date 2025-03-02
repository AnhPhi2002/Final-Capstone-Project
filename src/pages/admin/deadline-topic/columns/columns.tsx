import { ColumnDef } from "@tanstack/react-table";
import { SubmissionRound } from "@/lib/api/types"; // Đúng đường dẫn import
import { Action } from "./action";
import { Badge } from "@/components/ui/badge"; // Dùng Badge để hiển thị trạng thái

export const columns: ColumnDef<SubmissionRound>[] = [
  {
    accessorKey: "id", // Đảm bảo đúng với API trả về
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "startDate",
    header: "Ngày bắt đầu",
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return date ? new Intl.DateTimeFormat("vi-VN").format(new Date(date)) : "Không xác định";
    },
  },
  {
    accessorKey: "endDate",
    header: "Ngày kết thúc",
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return date ? new Intl.DateTimeFormat("vi-VN").format(new Date(date)) : "Không xác định";
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ getValue }) => {
      const status = getValue<string>();

      let color = "gray";
      if (status === "ACTIVE") color = "green";
      else if (status === "PENDING") color = "yellow";
      else if (status === "COMPLETE") color = "red";

      return <Badge className={`bg-${color}-500 text-white px-2 py-1 rounded-md`}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <Action round={row.original} />, // ✅ Truyền toàn bộ `round`
  },
];
