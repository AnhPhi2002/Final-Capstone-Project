import { ColumnDef, CellContext } from "@tanstack/react-table";
import { ReviewSchedule } from "@/lib/api/types";
import { Action } from "./action";
import { Badge } from "@/components/ui/badge";

type ExtendedCellContext<TData, TValue> = CellContext<TData, TValue> & {
  refetchData?: () => void;
};

export const columns: ColumnDef<ReviewSchedule>[] = [
  // {
  //   accessorKey: "schedule.council.name",
  //   header: "Tên hội đồng",
  // },
  {
    accessorKey: "schedule.group.groupCode",
    header: "Nhóm",
  },
  {
    accessorKey: "schedule.topic.topicCode",
    header: "Đề tài",
  },
  {
    accessorKey: "schedule.group.topicAssignments[0].defenseRound",
    header: "Đợt bảo vệ",
    cell: ({ row }) => {
      const defenseRound = row.original.schedule.group.topicAssignments[0]?.defenseRound;
      return defenseRound ?? "N/A";
    }
  },
  {
    accessorKey: "schedule.group.defendStatus",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.schedule.group.topicAssignments[0]?.defendStatus;
      return status === "CONFIRMED"
        ? <Badge className="bg-green-100 text-green-600">Cho phép bảo vệ</Badge>
        : status === "UN_CONFIRMED"
          ? <Badge className="bg-red-100 text-red-600">Không cho phép bảo vệ</Badge>
          : <Badge className="bg-gray-100 text-gray-600">Không xác định</Badge>;
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: (info) => {
      const { row, refetchData } = info as ExtendedCellContext<ReviewSchedule, unknown>;
      return <Action schedule={row.original} refetchData={refetchData} />;
    },
  },
];
