import Header from '@/components/header';
import { columns } from "./columns";
import ToolPanel from './tool-panel';
import { DataTable } from './data-table';
import CouncilMemberData from "@/data/council-member.json";
import { CouncilMember } from "@/types/council-member";

export const CouncilMemberDetail = () => {
  const data: CouncilMember[] = CouncilMemberData.flatMap(item => 
    item.councilMember.map(member => ({
      id: member.id,
      email: member.email,
      phoneNumber: member.phoneNumber,
      lecturerCode: member.lecturerCode,
      role: member.role as "Chủ tịch" | "Thư ký" | "Thành viên",
      status: member.status,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    }))
  );
  return (
    <div className="flex flex-col h-screen">
    <Header title="Tổng quan" href="/" currentPage="Danh sách hội đồng đánh giá " />
    <div className="p-5 flex-1 overflow-auto">
      <ToolPanel />
      <DataTable columns={columns} data={data} />
    
    </div>
  </div>
  )
}
