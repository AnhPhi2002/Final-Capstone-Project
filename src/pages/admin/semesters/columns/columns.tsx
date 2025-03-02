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
    cell: ({ row }) => <span>{row.index + 1}</span>, // Dùng index thay vì id từ JSON
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
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "ACTIVE"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
        >
          {status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"}
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
