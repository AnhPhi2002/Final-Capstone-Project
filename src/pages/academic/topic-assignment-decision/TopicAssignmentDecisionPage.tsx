import Header from "@/components/header";
import { SelectSemester } from "./seclect-semester/select-semester";

export const TopicAssignmentDecisionPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Quyết định phân công đề tài"
      />

      <div className="p-5 flex-1 overflow-auto">
        <SelectSemester />
      </div>
    </div>
  );
};