import Header from "@/components/header";
import { SelectSemester } from "./select-semester/select-semester";

export const DecisionDefensePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Quyết định nhóm bảo vệ" />

      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div>

          </div>
          <div className="w-full">
          <SelectSemester/>
          </div>
        </div>
      </div>
    </div>
  );
};
