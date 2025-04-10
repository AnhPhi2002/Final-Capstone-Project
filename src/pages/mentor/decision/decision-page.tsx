import Header from "@/components/header";
import { SelectSemester } from "./select/select-semester";

export const DecisionPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="w-full mt-[52px]">
            <SelectSemester />
          </div>
        </div>
      </div>
    </div>
  );
};
