import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import data from "@/data/students.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const StudentListPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách hội đồng đánh giá "
      />
      <div className="p-5 flex justify-between">
        <div>
          <Input></Input>
        </div>
        <div className="flex justify-end gap-3">
          <Button>Import</Button>
          <Button>Xuat file</Button>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default StudentListPage;
