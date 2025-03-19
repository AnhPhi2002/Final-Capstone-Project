import Header from "@/components/header";
import { SelectSemester } from "./seclect-semester/select-semester";

export const ReviewTopicPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách đề tài chờ xét duyệt"
      />

      <div className="p-5 flex-1 overflow-auto">
        <SelectSemester />
      </div>
    </div>
  );
};
