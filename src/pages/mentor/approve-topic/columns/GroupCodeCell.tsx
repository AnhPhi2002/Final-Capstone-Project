import { useNavigate, useParams } from "react-router";

type GroupCodeCellProps = {
  groupId: string | null;
  groupCode: string;
};

export const GroupCodeCell: React.FC<GroupCodeCellProps> = ({ groupId, groupCode }) => {
  const navigate = useNavigate();
  const { semesterId } = useParams(); // ✅ Lấy semesterId từ URL

  if (!groupId) return <span className="text-gray-400">Chưa có</span>;

  return (
    <span
      className="text-blue-600 hover:underline cursor-pointer"
      onClick={() => navigate(`/lecturer/group-student-detail/${groupId}/${semesterId}`)}
    >
      {groupCode}
    </span>
  );
};
