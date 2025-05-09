// src/components/ui/custom-data-table.tsx
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
  import React from "react";
  
  interface CustomColumnMeta {
    className?: string;
  }
  
  declare module "@tanstack/react-table" {
    interface ColumnMeta<TData, TValue> extends CustomColumnMeta {}
  }
  
  interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
  }
  
  export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
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
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border border-black">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border border-black px-2 py-1 text-center font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
  
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border border-black">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`border border-black px-2 py-1 ${
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
                <TableCell colSpan={columns.length} className="text-center py-4">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
  