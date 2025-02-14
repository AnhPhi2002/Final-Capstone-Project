import Header from "@/components/header";
import { CardGroupStudent } from "./card-group-student";
import groupData from "@/data/group-student.json";
import SendMailButton from "./send-mail-button";

export const GroupStudentCardPage = () => {
  console.log("Group Data in GroupStudentCardPage:", groupData);
  
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4">
          <SendMailButton />
        </div>

        <CardGroupStudent data={groupData} />
      </div>
    </div>
  );
};
