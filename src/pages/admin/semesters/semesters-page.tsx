import Header from "@/components/header";
import { SelectSemester } from "./select-semester";
// import { CreateYearSemesters } from "./columns/create-year-semesters";
import { CreateSemesters } from "./columns/create-semesters";

export function SemestersPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Semesters" href="/" currentPage="Quản lý năm học và học kỳ " />
      <div className="p-5 flex-1 overflow-auto">

        <div className="flex justify-between">
          <SelectSemester />
          
       
          <div className="flex gap-4 ml-4">
      
            <CreateSemesters />
          </div>
        </div>
      </div>
    </div>
  );
}
