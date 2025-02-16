
import Header from "@/components/header";

import groupData from "@/data/group-student.json"; // Assuming it's valid data

import { DataTable } from "./data-table";
import { columns } from "./columns"; // Ensure the columns file is properly imported
import CreateGroup from "./create-group-button";

export const GroupStudentCardPage = () => {
  console.log("Group Data in GroupStudentCardPage:", groupData); // Optional, remove in production

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4">
          <CreateGroup />
        </div>
        <DataTable columns={columns} data={groupData} />
      </div>
    </div>
  );
};
