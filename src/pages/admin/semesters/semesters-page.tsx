import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { columns, Semester } from "./columns";
import { DataTable } from "./data-table";
import { ToolPanel } from "./tool-panel";
import Header from "@/components/header";

const data: Semester[] = [
  {
    id: "1",
    year: "2025",
    code: "Spring2025",
    start_date: "2025-01-01",
    end_date: "2025-05-31",
    registration_deadline: "2024-12-15",
    status: "Active",
    created_at: "2024-11-01",
  },
  {
    id: "2",
    year: "2025",
    code: "Summer2025",
    start_date: "2025-06-01",
    end_date: "2025-08-31",
    registration_deadline: "2025-05-01",
    status: "Inactive",
    created_at: "2024-12-01",
  },
  {
    id: "3",
    year: "2025",
    code: "Fall2025",
    start_date: "2025-09-01",
    end_date: "2025-12-31",
    registration_deadline: "2025-08-15",
    status: "Active",
    created_at: "2025-01-01",
  },
];

export function SemestersPage() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Add filtering functionality
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
