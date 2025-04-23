import Header from "@/components/header";
import { AllTopicList } from "./all-topic-list";
// import { AllTopicDetail } from "./columns/all-topic-detail";



export const AllTopicStudent = () => {


  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách đề tài trong kỳ" />
      <div className="p-5 flex-1 overflow-auto">
       < AllTopicList />
      </div>
    </div>
  );
};
