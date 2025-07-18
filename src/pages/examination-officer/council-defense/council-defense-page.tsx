import Header from "@/components/header";
// import { CreateDefenseTopicCouncil } from "./create-council-defense";
import { SelectSemester } from "./seclect-semester/select-semester";

export const CouncilDefensePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách hội bảo vệ đồ án" />

      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          {/* <div>
            <CreateDefenseTopicCouncil />
          </div> */}
          <div className="w-full">
  
          <SelectSemester/>
          </div>
        </div>
      </div>
    </div>
  );
};
