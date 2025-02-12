import Header from "@/components/header";
import { SelectSemester } from "./select-semester";
// import { CreateYearSemesters } from "./columns/create-year-semesters";
import { CreateSemesters } from "./columns/create-semesters";

export function SemestersPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Semesters" href="/" currentPage="Quản lý năm học và học kỳ " />
      <div className="p-5 flex-1 overflow-auto">
        {/* Sử dụng flex để bố cục ngang */}
        <div className="flex justify-between items-start">
          <SelectSemester />
          
          {/* Gộp CreateYearSemesters và CreateSemesters vào một div */}
          <div className="flex gap-4 ml-4">
            {/* <CreateYearSemesters /> */}
            <CreateSemesters />
          </div>
        </div>
      </div>
    </div>
  );
}
