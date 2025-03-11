import Header from "@/components/header";
import { TopicStudentList } from "./topic-student-list";
import { CardSemester } from "./seclect-semester/card-semester";
import { SelectSemester } from "./seclect-semester/select-semester";


export const TopicStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách đề tài giảng viên" />

      <div className="flex flex-col flex-1">
        <div className="p-5 flex-1 overflow-auto">
          <SelectSemester />
        </div>
      </div>
    </div>
  );
};
