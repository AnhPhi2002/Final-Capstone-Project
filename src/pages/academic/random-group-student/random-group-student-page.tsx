
import Header from "@/components/header";
import { SelectSemester } from "./select/select-semester";

export const RandomGroupStudentPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm tạo ngẫu nhiên" />
      <div className="p-5 flex-1 overflow-auto">
        <SelectSemester />
      </div>
    </div>
  );
};
