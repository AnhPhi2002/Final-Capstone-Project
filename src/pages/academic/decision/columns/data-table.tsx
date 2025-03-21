import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Sử dụng ShadCN Table
import { Mentor } from "@/types/mentor";

interface CustomColumnMeta {
  className?: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> extends CustomColumnMeta {}
}

interface DataTableProps {
  columns: ColumnDef<Mentor>[];
  data: Mentor[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="border-collapse w-full text-[14.5pt] font-times text-justify">
        {/* Table Header */}
        <TableHeader className="text-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border border-black">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border border-black px-4 py-2 text-center font-bold text-black" // 🏆 Căn lề trái
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border border-black">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`border border-black px-4 py-2 ${
                      cell.column.columnDef.meta?.className || "text-left"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Không có kết quả.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}