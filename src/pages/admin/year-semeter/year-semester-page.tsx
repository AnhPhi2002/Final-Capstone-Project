import Header from "@/components/header";
import { CreateYearSemesters } from "./create-year-semesters";
import { CardYearSemester } from "./card-year-semester";

export const YearSemesterPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan "
        href="/"
        currentPage="Quản lý năm học"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4">
          <CreateYearSemesters />
        </div>
        <div className="">
          <CardYearSemester />
        </div>
      </div>
    </div>
  );
};
