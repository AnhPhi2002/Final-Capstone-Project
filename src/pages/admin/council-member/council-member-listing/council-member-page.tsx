import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import CouncilMemberData from "@/data/council-member.json";
import { CouncilMember } from "@/types/council-member";
import ToolPanel from "./tool-panel";

const CouncilMemberPage = () => {
  const data = CouncilMemberData as CouncilMember[];
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách hội đồng đánh giá " />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CouncilMemberPage;
