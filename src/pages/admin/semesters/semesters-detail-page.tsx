import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns"; 
import { Semester } from "@/types/semester"; 
import semesterData from "@/data/semester.json"; 
import { DataTable } from "./data-table"; 
import { ToolPanel } from "./tool-panel"; 
import Header from "@/components/header"; 

export function SemestersDetailPage() {

  const data: Semester[] = semesterData.map((item) => ({
    ...item,
    status:
      item.status === "Active" || item.status === "Inactive"
        ? item.status
        : "Inactive",
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
