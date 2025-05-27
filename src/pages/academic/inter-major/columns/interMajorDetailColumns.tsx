// src/components/columns/interMajorDetailColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type InterMajorDetailRow = {
  name: string;
  firstMajor: string;
  secondMajor: string;
  semester: string;
  isActive: boolean;
};

export const interMajorDetailColumns: ColumnDef<InterMajorDetailRow>[] = [
  {
    accessorKey: "name",
    header: "Tên liên ngành",
  },
  {
    accessorKey: "firstMajor",
    header: "Ngành thứ nhất",
  },
  {
    accessorKey: "secondMajor",
    header: "Ngành thứ hai",
  },
  {
    accessorKey: "semester",
    header: "Học kỳ",
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          className={
            isActive ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
          }
        >
          {isActive ? "Đang hoạt động" : "Không hoạt động"}
        </Badge>
      );
    },
  },
];