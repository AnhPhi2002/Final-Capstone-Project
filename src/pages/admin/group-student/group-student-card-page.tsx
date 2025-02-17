import Header from "@/components/header";
import groupData from "@/data/group-student.json"; 
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns"; 
import CreateGroup from "./create-group-button";
import { ExportExcelGroupStudent } from "./export-excel-group-student";

export const GroupStudentCardPage = () => {
  console.log("Group Data in GroupStudentCardPage:", groupData); 
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách nhóm sinh viên"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          <ExportExcelGroupStudent />
          <CreateGroup />
        </div>
        <DataTable columns={columns} data={groupData} />
      </div>
    </div>
  );
};
