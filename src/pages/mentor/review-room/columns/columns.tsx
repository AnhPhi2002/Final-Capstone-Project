// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ReviewSchedule } from "@/lib/api/types";
import { Action } from "./action";
import { Badge } from "@/components/ui/badge";


export const columns: ColumnDef<ReviewSchedule>[] = [
  {
    accessorKey: "schedule.council.name",
    header: "Tên hội đồng",
  },
  {
    accessorKey: "schedule.group.groupCode",
    header: "Nhóm",
  },
  {
    accessorKey: "schedule.topic.topicCode",
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
        return <Badge className="text-yellow-600 bg-yellow-100">Đang chờ</Badge>;
      } else if (status === "COMPLETED") {
        return <Badge className="text-green-600 bg-green-100">Hoàn thành</Badge>;
      } else {
        return <Badge className="text-gray-600 bg-gray-100">{status}</Badge>;
      }
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <Action schedule={row.original} />, // Truyền toàn bộ ReviewSchedule object
  },
];