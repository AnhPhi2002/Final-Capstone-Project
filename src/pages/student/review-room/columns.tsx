// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ReviewSchedule } from "@/lib/api/types"; 
import { ReportAction } from "./action";

export const columns: ColumnDef<ReviewSchedule>[] = [
  {
    accessorKey: "schedule.council",
    header: "Tên hội đồng",
  },
  {
    accessorKey: "schedule.group",
    header: "Nhóm",
  },
  {
    accessorKey: "schedule.topic",
    header: "Đề tài",
  },
  {
    accessorKey: "schedule.reviewTime",
    header: "Thời gian xét duyệt",
    cell: ({ row }) => {
      const date = new Date(row.original.schedule.reviewTime);
      return date.toLocaleString("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    accessorKey: "schedule.room",
    header: "Phòng",
  },
  {
    accessorKey: "schedule.status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.schedule.status;
      if (status === "PENDING") {
        return <span className="text-yellow-600">Đang chờ</span>;
      } else if (status === "COMPLETED") {
        return <span className="text-green-600">Hoàn thành</span>;
      } else {
        return <span className="text-gray-600">{status}</span>;
      }
    },
  },
  // {
  //   accessorKey: "url",
  //   header: "Link",
  //   cell: ({ row }) => (
  //     <a
  //       href={row.original.url || "#"}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className="text-blue-600 hover:underline"
  //     >
  //       {row.original.url ? "Truy cập" : "Không có"}
  //     </a>
  //   ),
  // },
  {
    id: "action",
    header: "Thao tác",
    cell: ({ row }) => {
      console.log("schedule:", row.original);
      return <ReportAction schedule={row.original} />;
    },
  }
];