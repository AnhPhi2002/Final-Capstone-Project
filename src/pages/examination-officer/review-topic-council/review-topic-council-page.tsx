  import Header from "@/components/header";
  import { SelectSemester } from "./seclect-semester/select-semester";
import { CreateReviewTopicCouncil } from "./create-review-topic-council";

  export const ReviewTopicCouncilPage = () => {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Tổng quan" href="/" currentPage="D.s xét duyệt đề tài " />

        <div className="p-5 flex-1 overflow-auto">
          <div className="flex flex-col items-end gap-4">
            <div>
              <CreateReviewTopicCouncil />
            </div>
            <div className="w-full">
              <SelectSemester />
            </div>
          </div>
        </div>
      </div>
    );
  };
