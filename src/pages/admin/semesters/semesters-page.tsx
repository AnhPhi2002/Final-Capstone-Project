import Header from "@/components/header";
import { SelectSemester } from "./select-semester";
import { CreateSemesters } from "./columns/create-semesters";

export function SemestersPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Semesters" href="/" currentPage="Quản lý năm học và học kỳ " />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>
            <CreateSemesters />
          </div>
          <div className="w-full">
            <SelectSemester />
          </div>
        </div>
      </div>
    </div>
  );
}
