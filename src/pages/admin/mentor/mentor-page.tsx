
import Header from "@/components/header";
import { SelectSemester } from "./select-semester";


export const MentorPage = () => {

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách giảng viên hướng dẫn" />
      <div className="p-5 flex-1 overflow-auto">
      <SelectSemester />
  
      </div>
    </div>
  );
};

export default MentorPage;
