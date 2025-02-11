import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import ToolPanel from "./tool-panel";
import studentData from "@/data/not-group-student.json";

export const StudentsNotGroupDetailPage = () => {
  const [filterStatus, setFilterStatus] = useState("*");

  // Chuyển đổi dữ liệu JSON
  const data = studentData.flatMap((semester) =>
    semester.students.map((student) => ({
      ...student,
      semester: semester.code,
    }))
  );

  // Lọc dữ liệu theo trạng thái
  const filteredData = filterStatus === "*" ? data : data.filter((s) => s.status === filterStatus);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold p-5">Danh sách sinh viên chưa nhóm</h1>
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel setFilterStatus={setFilterStatus} />
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};
