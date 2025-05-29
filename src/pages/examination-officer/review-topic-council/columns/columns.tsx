import { ColumnDef } from "@tanstack/react-table";
import { CouncilDetail } from "@/lib/api/types"; // 👈 dùng đúng type
import { ActionMenu } from "./action";
import { Badge } from "@/components/ui/badge";

// const formatDate = (dateString: string | undefined) => {
//   if (!dateString) return "—";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("vi-VN");
// };

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
      <ActionMenu
        council={row.original}
        refetchData={table.options.meta?.refetchData}
      />
    ),
  },
];
