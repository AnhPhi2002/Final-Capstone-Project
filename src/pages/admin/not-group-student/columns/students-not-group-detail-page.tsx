import { useParams } from "react-router"; 
import { columns } from "./columns";
import { DataTable } from "./data-table";
import ToolPanel from "./tool-panel";
import studentsData from "@/data/not-group-student.json"; // Fix import JSON
import { SemesterNotGroup, StudentNotGroup } from "@/types/not-group-student"; 
import Header from "@/components/header";

export const StudentsnotGroupDetailPage = () => {
  const { semesterId } = useParams(); 
  console.log("Semester ID from URL:", semesterId); // Debug ID từ URL

  const semesters: SemesterNotGroup[] = studentsData as SemesterNotGroup[];

  console.log("Semesters Data:", semesters); // Kiểm tra dữ liệu JSON đã load đúng chưa

  const semester = semesters.find((s) => s.id.toString() === semesterId);

  console.log("Found Semester:", semester); // Debug xem có tìm thấy học kỳ không

  if (!semester) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Không tìm thấy danh sách sinh viên</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
       <Header title="Danh sách sinh viên" href="/" currentPage="Chi tiết danh sách sinh viên trong kỳ" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        <DataTable columns={columns} data={semester.students} />
      </div>
    </div>
  );
};
