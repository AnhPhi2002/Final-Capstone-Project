
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// 🏆 **Component hiển thị danh sách nhóm từ `topicDetails`**
export const DataTableGroupTopic = () => {
  // 🟢 Lấy dữ liệu nhóm từ Redux Store (topicDetails)
  const { topicDetails } = useSelector((state: RootState) => state.topicStudents);

  if (!topicDetails?.group) {
    return <p className="text-center text-gray-500">Đề tài này chưa có nhóm.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Danh sách nhóm ({topicDetails.group.groupCode})
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Mã Sinh Viên</TableHead>
            <TableHead>Vai Trò</TableHead>
            <TableHead>Trạng Thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topicDetails.group.members.length > 0 ? (
            topicDetails.group.members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.studentId}</TableCell>
                <TableCell>
                  {member.role.name === "leader" ? (
                    <Badge className="bg-blue-100 text-blue-600">Leader</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-600">Member</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {member.status === "ACTIVE" ? (
                    <Badge className="bg-green-100 text-green-600">Hoạt động</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-600">Ngừng hoạt động</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Nhóm này chưa có thành viên.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
