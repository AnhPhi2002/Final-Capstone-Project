import Header from "@/components/header";
import { SelectSemester } from "./select/select-semester";




export const DecisionPage = () => {
  return (
    <div className="flex flex-col h-screen">
    <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
    <div className="p-5 flex-1 overflow-auto">
      
    <SelectSemester />

    </div>
  </div>
);
};


