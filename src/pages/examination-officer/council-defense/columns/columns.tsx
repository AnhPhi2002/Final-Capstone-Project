// src/components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilDefense } from "@/lib/api/types";
import { ActionMenu } from "./action";

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
    header: "Vòng xét duyệt",
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
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "ACTIVE") {
        return <span className="text-green-600">Đang hoạt động</span>;
      } else if (status === "COMPLETE") {
        return <span className="text-blue-600">Hoàn thành </span>;
      } else if (status === "UPCOMING")  {
        return <span className="text-yellow-600">Sắp diễn ra</span>;
      } else {
        return <span className="text-gray-600">Không xác định</span>;    
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