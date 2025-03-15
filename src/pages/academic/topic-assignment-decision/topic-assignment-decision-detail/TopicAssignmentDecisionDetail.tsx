
import { useParams } from "react-router";

import { columns } from "./columns";
import { TopicAssignmentDecisionDetail as TopicAssignmentDecisionDetailType } from "@/types/TopicAssignmentDecisionDetail";
import { TopicAssignmentDecisionTable } from "./data-table";

// Dữ liệu mẫu
const sampleMembers: TopicAssignmentDecisionDetailType[] = [
  { id: "1", fullName: "Nguyễn Văn A", specialty: "Công nghệ thông tin", department: "Khoa CNTT" },
  { id: "2", fullName: "Trần Thị B", specialty: "Kỹ thuật phần mềm", department: "Khoa CNTT" },
  { id: "3", fullName: "Lê Văn C", specialty: "Khoa học dữ liệu", department: "Khoa Toán - Tin" },
  { id: "4", fullName: "Phạm Thị D", specialty: "Quản trị kinh doanh", department: "Khoa Kinh tế" },
];

export const TopicAssignmentDecisionDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách thành viên phân công đề tài</h1>
      <p className="text-gray-600 mb-6">Học kỳ: {semesterId || "Không có ID"}</p>
      <TopicAssignmentDecisionTable columns={columns} data={sampleMembers} />
    </div>
  );
};