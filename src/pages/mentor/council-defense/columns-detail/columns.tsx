// src/components/columns.tsx (cho nhóm)
import { ColumnDef } from "@tanstack/react-table";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { Action } from "./action";

export const groupColumns = (semesterId: string): ColumnDef<DefenseSchedule>[] => [
  {
    accessorKey: "group.groupCode",
    header: "Mã nhóm",
  },
  {
    accessorKey: "group.topicAssignments[0].topic.name",
    header: "Tên đề tài",
    cell: ({ row }) => {
      const topic = row.original.group.topicAssignments[0]?.topic;
      return topic ? topic.name : "Không có đề tài";
    },
  },
  {
    accessorKey: "defenseTime",
    header: "Thời gian bảo vệ",
    cell: ({ row }) => new Date(row.original.defenseTime).toLocaleString("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
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
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <Action schedule={row.original} semesterId={semesterId} />,
  },
];