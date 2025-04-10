import Header from "@/components/header";
import { SelectSemester } from "./seclect-semester/select-semester";

export const TopicApprovedPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Đề tài đã xét duyệt "
      />

      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="w-full mt-[52px]">
            <SelectSemester />
          </div>
        </div>
      </div>
    </div>
  );
};
