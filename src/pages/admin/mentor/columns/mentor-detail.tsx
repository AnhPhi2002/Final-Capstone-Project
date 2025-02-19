import Header from "@/components/header"
import ToolPanel from "./tool-panel"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import mentorData from "@/data/mentor.json";
import { Mentor } from "@/types/mentor";
export const MentorDetail = () => {
    // Trích xuất danh sách Mentor từ dữ liệu JSON
    const mentors: Mentor[] = mentorData.flatMap((year) =>
      year.semesters.flatMap((semester) => semester.mentors)
    );
  return (
    <div className="flex flex-col h-screen">
    <Header title="Tổng quan" href="/" currentPage="Danh sách giảng viên hướng dẫn" />
    <div className="p-5 flex-1 overflow-auto">
    <ToolPanel />
      <DataTable columns={columns} data={mentors} />

    </div>
  </div>
  )
}
