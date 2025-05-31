import Header from "@/components/header";
// import { SelectSemester } from "./select/select-semester";
import { MeetingStudentDetail } from "./meeting-student";

export const MeetingStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Lịch họp"
      />
      <div className="p-5 flex-1 overflow-auto">
        {/* <SelectSemester /> */}
        <MeetingStudentDetail/>
      </div>
    </div>
  );
};
