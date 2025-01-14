
import data from "@/data/students.json";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import ToolPanel from "./tool-panel";

const StudentListPage = () => {
  return (
      <div className="flex flex-col h-screen">
        <Header title="Tổng quan" href="/" currentPage="Danh sách sinh viên " />
        <div className="p-5 flex-1 overflow-auto">
          <ToolPanel />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default StudentListPage;

