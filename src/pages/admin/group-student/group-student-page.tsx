import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import GroupStudentData from "@/data/group-student.json";
import { Group } from "@/types/group-student";


export const GroupStudentPage = () => {
  const data = GroupStudentData as Group[];
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh vien" />
      <div className="p-5 flex-1 overflow-auto">
 
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
