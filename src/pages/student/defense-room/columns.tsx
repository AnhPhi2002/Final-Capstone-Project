// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { ReportAction } from "./action";

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
        return <span className="text-yellow-600">Đang chờ</span>;
      } else if (status === "COMPLETED") {
        return <span className="text-green-600">Hoàn thành</span>;
      } else {
        return <span className="text-gray-600">{status}</span>;
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