// src/components/columns.tsx (cho nhóm)
import { ColumnDef } from "@tanstack/react-table";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { Action } from "./action";
import { Badge } from "@/components/ui/badge";

export const groupColumns = (semesterId: string, councilId: string): ColumnDef<DefenseSchedule>[] => [
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
    accessorKey: "notes",
    header: "Ghi chú",
    cell: ({ row }) => {
      const notes = row.original.notes;
      return notes ? notes : "N/A";
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <Action schedule={row.original} semesterId={semesterId} councilId={councilId} />,
  },
];