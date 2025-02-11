import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import GroupStudentData from "@/data/group-student.json";
import {  GroupMember } from "@/types/group-student";

export const GroupStudentDetail = () => {
  const data = GroupStudentData as unknown as GroupMember[]; 

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết nhóm" href="/" currentPage="Chi tiết nhóm" />
      <div className="p-5 flex-1 overflow-auto">
        <DataTable columns={columns} data={data} />
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
};
