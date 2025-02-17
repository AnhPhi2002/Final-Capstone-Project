import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {  useState } from "react";
import { AcademicData } from "@/types/not-group-student";
import ToolPanel from "./tool-panel";

export const NotGroupStudentDetailPage = () => {
    const [data, setData] = useState<AcademicData>([]);
  fetch("/data/semester.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => setData(data))
  .catch((error) => console.error("Error fetching JSON:", error));

  
  return (
    <div className="flex flex-col h-screen">
    <Header title="Tổng quan" href="/" currentPage="Danh sách sinh viên chưa có nhóm KLTN" />
    <div className="p-5 flex-1 overflow-auto">
      <ToolPanel />
      <DataTable columns={columns} data={data.flatMap(year => year.semesters.flatMap(sem => sem.students))} />
    </div>
  </div>
  )
}
