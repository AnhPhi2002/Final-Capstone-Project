// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { ReportAction } from "./action";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<DefenseSchedule>[] = [
  {
    accessorKey: "council.name",
    header: "Tên hội đồng",
  },
  {
    accessorKey: "group.groupCode",
    header: "Nhóm",
  },
  {
    accessorKey: "group.topicAssignments[0].topic.name",
    header: "Đề tài",
    cell: ({ row }) => {
      const topic = row.original.group.topicAssignments[0]?.topic;
      return topic ? topic.name : "Không có đề tài";
    },
  },
  {
    accessorKey: "defenseTime",
    header: "Thời gian bảo vệ",
    cell: ({ row }) => {
      const date = new Date(row.original.defenseTime);
      return date.toLocaleString("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    accessorKey: "room",
    header: "Phòng",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "PENDING") {
        return <Badge className="bg-yellow-100 text-yellow-600">Đang chờ</Badge>;
      } else if (status === "COMPLETE") {
        return <Badge className="bg-green-100 text-green-600">Hoàn thành</Badge>;
      } else if (status === "ACTIVE") {
        return <Badge className="bg-blue-100 text-blue-600">Đang hoạt động</Badge>;
      } else if (status === "CANCELED") {
        return <Badge className="bg-red-100 text-red-600">Đã hủy</Badge>;
      } else {
        return <Badge className="bg-gray-100 text-gray-600">{status}</Badge>;
      }
    },
  },
  {
    id: "action",
    header: "Thao tác",
    cell: ({ row }) => {
      console.log("schedule:", row.original);
      return <ReportAction schedule={row.original} />;
    },
  },
];