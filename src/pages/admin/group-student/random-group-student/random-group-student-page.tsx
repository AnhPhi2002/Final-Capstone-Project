import Header from "@/components/header";
import { CreateRandomGroup } from "./create-random-group";
import { DataTable } from "./data-table";
import { columns } from "./columns"; // Import columns
import groupData from "@/data/group-student.json"; // Import dữ liệu nhóm sinh viên

export const RandomGroupStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách nhóm tạo ngẫu nhiên"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          <CreateRandomGroup />
        </div>
        <DataTable columns={columns} data={groupData} />
      </div>
    </div>
  );
};
