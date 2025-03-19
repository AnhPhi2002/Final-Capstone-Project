import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicsGroupRegistered } from "@/lib/api/redux/topicGroupRegisterSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Hàm chuyển đổi trạng thái phê duyệt
const getApprovalStatusBadge = (status: string) => {
  switch (status) {
    case "APPROVED":
      return <Badge className="bg-green-100 text-green-600">Chấp nhận</Badge>;
    case "REJECTED":
      return <Badge className="bg-red-100 text-red-600">Từ chối</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-600">Đang chờ</Badge>;
  }
};

export const TopicGroupRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topics, loading, error } = useSelector(
    (state: RootState) => state.topicGroupRegister
  );

  useEffect(() => {
    dispatch(fetchTopicsGroupRegistered());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;
  if (topics.length === 0) return <p className="text-center text-gray-500">Không có đề tài nào.</p>;

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => navigate(`/student/topic-group-register-detail/${topic.id}`)}
        >
          {/* Avatar đại diện cho đề tài */}
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={`https://robohash.org/${encodeURIComponent(topic.nameEn || "Unknown")}.png`}
              alt="Topic Avatar"
            />
            <AvatarFallback>{topic.nameEn?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>

          {/* Nội dung chính */}
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{topic.nameEn}</h4>
            <p className="text-sm text-gray-500">{topic.topicCode}</p>
            <p className="text-sm">{topic.description}</p>
          </div>

          {/* Trạng thái phê duyệt */}
          {getApprovalStatusBadge(topic.approvalStatus)}
        </div>
      ))}
    </div>
  );
};
