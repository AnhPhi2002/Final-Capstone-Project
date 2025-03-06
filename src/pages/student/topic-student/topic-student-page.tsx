import Header from "@/components/header";
import { TopicStudentList } from "./topic-student-list";


export const TopicStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách đề tài giảng viên" />

      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto p-6">
          <TopicStudentList onTopicClick={(id: string) => console.log(id)} />
        </div>
      </div>
    </div>
  );
};
