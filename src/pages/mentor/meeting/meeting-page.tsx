import Header from "@/components/header";
import { SelectSemester } from "./select-semester";

const MeetingListPage = () => {
  return (
      <div className="flex flex-col h-screen">
        <Header title="Tổng quan" href="/" currentPage="Danh sách phòng họp " />
        <div className="p-5 flex-1 overflow-auto">         
        <SelectSemester />
      </div>
    </div>
  );
};

export default MeetingListPage;