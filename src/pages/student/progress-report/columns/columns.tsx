import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";

export const columns: ColumnDef<ProgressReport>[] = [
  {
    accessorKey: "weekNumber",
    header: "Tuần",
    cell: ({ row }) => {
      return <div>{row.original.weekNumber}</div>;
    },
  },
  {
    accessorKey: "content",
    header: "Nội dung",
    cell: ({ row }) => {
      const content = row.original.content;
      return <div>{content ? content.slice(0, 50) + (content.length > 50 ? "..." : "") : "Chưa có nội dung"}</div>;
    },
  },
  {
    accessorKey: "completionPercentage",
    header: "Phần trăm hoàn thành",
    cell: ({ row }) => {
      return <div>{row.original.completionPercentage}%</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      let badge;

      switch (status) {
        case "ACTIVE":
          badge = <Badge className="bg-yellow-100 text-yellow-600">Đang hoạt động</Badge>;
          break;
        case "SUBMITTED":
          badge = <Badge className="bg-blue-100 text-blue-600">Đã nộp</Badge>;
          break;
        case "REVIEWED":
          badge = <Badge className="bg-green-100 text-green-600">Đã duyệt</Badge>;
          break;
        default:
          badge = <Badge className="bg-gray-100 text-gray-600">Không xác định</Badge>;
      }

      return badge;
    },
  },
  {
    id: "actions",
    header: "Hành động",
  },
];