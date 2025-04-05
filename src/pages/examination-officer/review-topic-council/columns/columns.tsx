import { ColumnDef } from "@tanstack/react-table";
import { CouncilDetail } from "@/lib/api/types"; // 👈 dùng đúng type
import { ActionMenu } from "./action";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

export const columnsCouncils: ColumnDef<CouncilDetail, any>[] = [
  {
    accessorKey: "council.name",
    header: "Tên hội đồng",
    cell: ({ row }) => row.original.council.name,
  },
  {
    accessorKey: "council.code",
    header: "Mã hội đồng",
    cell: ({ row }) => row.original.council.code,
  },
  {
    accessorKey: "council.round",
    header: "Vòng xét duyệt",
    cell: ({ row }) => row.original.council.round,
  },
  // {
  //   accessorKey: "council.councilStartDate",
  //   header: "Ngày bắt đầu",
  //   cell: ({ row }) => formatDate(row.original.council.councilStartDate),
  // },
  // {
  //   accessorKey: "council.councilEndDate",
  //   header: "Ngày kết thúc",
  //   cell: ({ row }) => formatDate(row.original.council.councilEndDate),
  // },
  {
    accessorKey: "council.status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.council.status;
      if (status === "ACTIVE") {
        return <span className="text-green-600">Đang hoạt động</span>;
      } else if (status === "COMPLETE") {
        return <span className="text-blue-600">Hoàn thành</span>;
      } else if (status === "UPCOMING") {
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
      <ActionMenu
        council={row.original}
        refetchData={table.options.meta?.refetchData}
      />
    ),
  },
];
