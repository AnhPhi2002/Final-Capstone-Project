import Header from "@/components/header";
import { SelectYearSemester } from "./select-year-semester";
import { CreateYearSemesters } from "./create-year-semesters";
import { CardYearSemester } from "./card-year-semester";

export const YearSemesterPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Semesters"
        href="/"
        currentPage="Quản lý năm học và học kỳ"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4">
          <CreateYearSemesters />
        </div>
{/* <SelectYearSemester/> */}
        <div className="">
          <CardYearSemester />
        </div>
      </div>
    </div>
  );
};
