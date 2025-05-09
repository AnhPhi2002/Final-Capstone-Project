// src/components/columns/interMajorDetailColumns.ts
import { ColumnDef } from "@tanstack/react-table";

export type InterMajorDetailRow = {
  field: string;
  value: string | JSX.Element;
};

export const interMajorDetailColumns: ColumnDef<InterMajorDetailRow>[] = [
  {
    accessorKey: "field",
    header: "Thông tin",
    cell: ({ row }) => row.original.field,
    meta: { className: "font-semibold text-left" },
  },
  {
    accessorKey: "value",
    header: "Giá trị",
    cell: ({ row }) => row.original.value,
    meta: { className: "text-left" },
  },
];
