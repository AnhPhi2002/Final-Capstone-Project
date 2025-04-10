"use client";

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
} from "@/components/ui/table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData extends { topicCode: string }>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  // Tạo map đếm số dòng theo topicCode
  const topicRowSpanMap: Record<string, number> = {};
  data.forEach((row) => {
    topicRowSpanMap[row.topicCode] = (topicRowSpanMap[row.topicCode] || 0) + 1;
  });

  const topicRenderedSet = new Set<string>();

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="border-collapse w-full text-[12.5pt] font-times text-justify">
        <TableHeader className="text-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border border-black">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border border-black px-2 py-1 text-center font-bold text-black"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const topicCode = row.original.topicCode;
            const isFirstRowOfTopic = !topicRenderedSet.has(topicCode);
            if (isFirstRowOfTopic) topicRenderedSet.add(topicCode);

            return (
              <TableRow key={row.id} className="border border-black">
                {row.getVisibleCells().map((cell) => {
                  const accessorKey = cell.column.id;

                  const mergedCols = [
                    "groupCode",
                    "topicCode",
                    "nameEn",
                    "nameVi",
                    "gvhd",
                    "majors",
                  ];

                  const shouldMerge = mergedCols.includes(accessorKey);

                  // Nếu là cột cần gộp và không phải dòng đầu của đề tài → return null
                  if (shouldMerge && !isFirstRowOfTopic) {
                    return null;
                  }

                  // Nếu là dòng đầu tiên → set rowspan
                  const rowspan = shouldMerge ? topicRowSpanMap[topicCode] : undefined;

                  return (
                    <TableCell
                      key={cell.id}
                      rowSpan={rowspan}
                      className={`border border-black px-2 py-1 ${
                        cell.column.columnDef.meta?.className || "text-left"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell || cell.getValue,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
