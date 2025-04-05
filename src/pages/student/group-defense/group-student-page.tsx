import Header from "@/components/header";
import { GroupStudentDefenseCardPage } from "./group-student-card-page";
// import { SelectSemester } from "./select/select-semester";

export const GroupStudentDefenseWithStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách nhóm sinh vien"
      />
      <div className="p-5 flex-1 overflow-auto">
        {/* <SelectSemester /> */}
        <GroupStudentDefenseCardPage />
      </div>
    </div>
  );
};
