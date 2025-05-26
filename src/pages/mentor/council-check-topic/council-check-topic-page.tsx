import Header from "@/components/header";
import { SelectSemester } from "./seclect-semester/select-semester";

export const CouncilCheckTopicPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách hội đồng xét duyệt đề tài KLTN " />

      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>

          </div>
          <div className="w-full">
          <SelectSemester/>
          </div>
        </div>
      </div>
    </div>
  );
};
