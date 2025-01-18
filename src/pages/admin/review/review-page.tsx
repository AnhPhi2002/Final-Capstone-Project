import React from "react";
import { useReactTable, SortingState, ColumnFiltersState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { ToolPanel } from "./tool-panel";
import { DataTable } from "./data-table";
import { columns, Group } from "./columns";
import Header from "@/components/header";

const data: Group[] = [
  {
    id: "group1",
    group_name: "Group Alpha",
    student_leader: "Alice Johnson",
    mentor_1: "Dr. Smith",
    mentor_2: "Prof. Doe",
    review_1: "Done",
    review_1_file: "https://docs.google.com/spreadsheets/d/1ABC123/view",
    review_2: "Done",
    review_2_file: "https://docs.google.com/spreadsheets/d/2XYZ456/view",
    review_3: "Default",
    review_3_file: null,
    bv_1: "Passed",
    bv_2: "Not Passed",
  },
  {
    id: "group2",
    group_name: "Group Beta",
    student_leader: "Bob Brown",
    mentor_1: "Dr. Lee",
    mentor_2: "Prof. Carter",
    review_1: "Default",
    review_1_file: null,
    review_2: "Failed",
    review_2_file: null,
    review_3: "Done",
    review_3_file: "https://docs.google.com/spreadsheets/d/3LMN456/view",
    bv_1: "Not Passed",
    bv_2: "Passed",
  },

];



export function ReviewPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Review nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel table={table} />
        <DataTable table={table} />
      </div>
    </div>
  );
}
