
import { useParams } from "react-router"; 
import { columns } from "./columns";
import { DataTable } from "./data-table";
import ToolPanel from "./tool-panel";
import studentsData from "@/data/students.json"; 
import { Student, AcademicYear } from "@/types/students"; 
import Header from "@/components/header";

export const StudentsDetailPage = () => {
  const { studentId } = useParams(); 


  const academicYears: AcademicYear[] = studentsData as AcademicYear[];


  const students: Student[] = academicYears.flatMap((year) =>
    year.semesters.flatMap((semester) => semester.students || [])
  );


  const student = students.find((s) => s.id.toString() === studentId);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Không tìm thấy sinh viên</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
       <Header title="Danh sách sinh viên " href="/" currentPage=" Chi tiết danh sách sinh viên trong kỳ " />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
      
        <DataTable columns={columns} data={[student]} />
      </div>
    </div>
  );
};
