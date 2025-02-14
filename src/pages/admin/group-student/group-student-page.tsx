import Header from "@/components/header";
import { SelectSemester } from "./select/select-semester";

export const GroupStudentPage = () => {
  const listIdSemester  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách nhóm sinh vien"
      />
      <div className="p-5 flex-1 overflow-auto">
        <SelectSemester />
        
      </div>
    </div>
  );
};
