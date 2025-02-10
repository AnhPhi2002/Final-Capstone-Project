import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Semester } from "@/types/semester";
import semesterData from "@/data/semester.json";

import Header from "@/components/header";
import { ToolPanel } from "./tool-panel";
import { DataTable } from "./data-table";

export function SemestersDetailPage() {
  const data: Semester[] = semesterData.map((semester) => ({
    ...semester,
    semester_detail: semester.semester_detail.map((detail) => ({
      ...detail,
      status: detail.status as "Active" | "Inactive", 
      semester_year: semester.year,
      semester_code: semester.code,
    })),
  }));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title="Semesters" href="/" currentPage="Semester Management" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel table={table} />
        <DataTable table={table} />
      </div>
    </div>
  );
}
