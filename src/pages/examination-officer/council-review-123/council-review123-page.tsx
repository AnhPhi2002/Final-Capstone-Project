import Header from "@/components/header";
import { CreateReviewTopicCouncil } from "./create-council-review123";
import { SelectSemester } from "./seclect-semester/select-semester";

export const CouncilReviewPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách hội kiểm tra đồ án" />

      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>
            <CreateReviewTopicCouncil />
          </div>
          <div className="w-full">
  
          <SelectSemester/>
          </div>
        </div>
      </div>
    </div>
  );
};
