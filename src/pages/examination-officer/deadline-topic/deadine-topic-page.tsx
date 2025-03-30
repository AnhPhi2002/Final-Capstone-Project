import Header from "@/components/header";
import { SelectSemester } from "./select-semester";
import { CreateSubmissionRound } from "./columns/create-deadline-topic";

export const DeadineTopicPage = () => {
  return (
    <div className="flex flex-col h-screen">
    <Header title="Semesters" href="/" currentPage="Thời gian đăng kí đợt đề tài" />
    <div className="p-8 flex-1 overflow-auto">
      <div className="flex flex-col items-end gap-4">
        <div>
       <CreateSubmissionRound />
        </div>
        <div className="w-full">
          <SelectSemester />
        </div>
      </div>
    </div>
  </div>
);
}
