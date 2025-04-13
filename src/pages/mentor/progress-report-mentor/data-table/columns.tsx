import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Action } from "./action";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";

export const columns: ColumnDef<ProgressReport>[] = [
  {
    accessorKey: "group.groupCode",
    header: "Mã Nhóm",
    cell: ({ row }) => {
      return <div>{row.original.group.groupCode}</div>;
    },
  },
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
  // {
  //   accessorKey: "isRead",
  //   header: "Đã đọc",
  //   cell: ({ row }) => {
  //     const isRead = row.original.isRead;
  //     return (
  //       <Badge className={isRead ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}>
  //         {isRead ? "Đã đọc" : "Chưa đọc"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "submittedAt",
    header: "Ngày nộp",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.submittedAt
            ? new Date(row.original.submittedAt).toLocaleString()
            : "Chưa nộp"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => {
      return <Action report={row.original} />;
    },
  },
];