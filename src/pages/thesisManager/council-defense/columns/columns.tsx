// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilDefense } from "@/lib/api/types";
import { ActionMenu } from "./action";
import { Badge } from "@/components/ui/badge";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN"); // Format: DD/MM/YYYY
};

export const columnsCouncils: ColumnDef<CouncilDefense, any>[] = [
  {
    accessorKey: "name",
    header: "Tên hội đồng",
  },
  {
    accessorKey: "code",

    header: "Mã Hội đồng",

  },
  {
    accessorKey: "round",
    header: "Vòng bão vệ",
  },
  {
    accessorKey: "councilStartDate",
    header: "Ngày bắt đầu",
    cell: ({ row }) => formatDate(row.original.councilStartDate),
  },
  {
    accessorKey: "councilEndDate",
    header: "Ngày kết thúc",
    cell: ({ row }) => formatDate(row.original.councilEndDate),
  },
{
    accessorKey: "council.status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "ACTIVE") {
        return <Badge className="text-green-600 bg-green-100">Đang hoạt động</Badge>;
      } else if (status === "COMPLETE") {
        return <Badge className="text-blue-600 bg-blue-100">Hoàn thành</Badge>;
      } else if (status === "UPCOMING") {
        return <Badge className="text-yellow-600 bg-yellow-100">Sắp diễn ra</Badge>;
      } else {
        return <Badge className="text-gray-600 bg-gray-100">Không xác định</Badge>;
      }
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row, table }) => (
      <ActionMenu council={row.original} refetchData={table.options.meta?.refetchData} />
    ),
  },
];