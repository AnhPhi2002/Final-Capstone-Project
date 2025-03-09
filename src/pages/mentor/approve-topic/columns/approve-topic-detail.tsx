import Header from "@/components/header";
import { ToolPanel } from "./tool-panel";
import { DataTable } from "./data-table";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { columnsApproveTopic } from "./columns";


// ✅ Định nghĩa kiểu dữ liệu
type ApproveTopic = {
  id: string;
  groupCode: string;
  topic: {
    nameEn: string;
  };
  isActive: boolean;
};

// ✅ Dữ liệu mẫu
const ApproveTopicMockData: ApproveTopic[] = [
  { id: "1", groupCode: "GRP001", topic: { nameEn: "Artificial Intelligence in Healthcare" }, isActive: true },
  { id: "2", groupCode: "GRP002", topic: { nameEn: "Blockchain in Finance" }, isActive: false },
  { id: "3", groupCode: "GRP003", topic: { nameEn: "Cybersecurity in Cloud Computing" }, isActive: true },
  { id: "4", groupCode: "GRP004", topic: { nameEn: "Machine Learning for Fraud Detection" }, isActive: false },
  { id: "5", groupCode: "GRP005", topic: { nameEn: "IoT and Smart Cities" }, isActive: true },
];

export const ApproveTopicDetail = () => {
  const table = useReactTable({
    data: ApproveTopicMockData, // ✅ Sử dụng dữ liệu mẫu
    columns: columnsApproveTopic, // ✅ Cập nhật đúng tên mới
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết hội đồng xét duyệt" href="/review-topic" currentPage="Quản lý giảng viên" />
      <div className="p-6 flex-1 overflow-auto">
        <ToolPanel table={table} />
        <DataTable table={table} />
      </div>
    </div>
  );
};
