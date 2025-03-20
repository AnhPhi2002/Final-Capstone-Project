import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Semester } from "@/lib/api/types";
import { ActionMenu } from "./action";

// Define the extended TableMeta type
declare module '@tanstack/table-core' {
  interface TableMeta<TData> {
    refetchData?: () => void;
  }
}

export const columns: ColumnDef<Semester>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "year.year",
    header: "Năm học",
    cell: ({ row }) => (
      <span>{row.original.year?.year || "Chưa xác định"}</span>
    ),
  },
  {
    accessorKey: "code",
    header: "Học kỳ",
    cell: ({ row }) => <span>{row.getValue("code")}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Ngày bắt đầu",
    cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "Ngày kết thúc",
    cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusClasses; // ✅ Chắc chắn rằng status là một key hợp lệ của statusClasses
      
      // Map trạng thái thành class màu tương ứng, thêm hover nhạt
      const statusClasses: Record<"ACTIVE" | "UPCOMING" | "COMPLETE", string> = {
        ACTIVE: "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200",
        UPCOMING: "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200",
        COMPLETE: "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200",
      };
  
      return (
        <Badge
          className={
            statusClasses[status] || "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
          }
        >
          {status === "ACTIVE"
            ? "Đang hoạt động"
            : status === "UPCOMING"
            ? "Sắp diễn ra"
            : status === "COMPLETE"
            ? "Hoàn thành"
            : "Không xác định"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    // header: "Hành động",
    cell: ({ row, table }) => (
      <ActionMenu 
        semesterId={row.original.id} 
        refetchData={table.options.meta?.refetchData}
      />
    ),
  },
];
