// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ReviewSchedule } from "@/lib/api/types";
import { Action } from "./action";

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

  // {
  //   accessorKey: "schedule.reviewTime",
  //   header: "Thời gian xét duyệt",
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.schedule.reviewTime);
  //     return date.toLocaleString("vi-VN", {
  //       dateStyle: "medium",
  //       timeStyle: "short",
  //     });
  //   },
  // },
  // {
  //   accessorKey: "schedule.room",
  //   header: "Phòng",
  // },
  {
    accessorKey: "schedule.reviewRound",
    header: "Đợt xét duyệt",
  },
  {
    accessorKey: "schedule.group.defendStatus",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.schedule.group.defendStatus;
      if (status === "CONFIRMED") {
        return <span className="text-green-600">Cho phép bảo vệ</span>;
      } else
        return <span className="text-red-600">Chưa bảo vệ</span>;

    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <Action schedule={row.original} />, // Truyền toàn bộ ReviewSchedule object
  },
];