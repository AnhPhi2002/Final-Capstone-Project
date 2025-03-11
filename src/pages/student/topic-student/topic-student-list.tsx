import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchAvailableTopics } from "@/lib/api/redux/topicStudentSlice";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "Invalid Date" : new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const statusLabels = {
  REGISTERED: "Đăng ký",
  PENDING: "Chờ xét duyệt",
  REJECTED: "Từ chối",
  APPROVED: "Đã duyệt",
};

const statusVariants = {
  REGISTERED: "bg-green-100 text-green-700 border border-green-500 hover:bg-green-200 cursor-pointer",
  PENDING_REVIEW: "bg-yellow-100 text-yellow-700 border border-yellow-500 hover:bg-yellow-200 cursor-pointer",
  REJECTED: "bg-red-100 text-red-700 border border-red-500 hover:bg-red-100 cursor-not-allowed",
  APPROVED: "bg-blue-100 text-blue-700 border border-blue-500 hover:bg-blue-200 cursor-not-allowed",
};

export const TopicStudentList = () => {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { availableTopics, loading, error } = useSelector((state: RootState) => state.topicStudents);
  const [topicStatuses, setTopicStatuses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchAvailableTopics(semesterId));
    }
  }, [dispatch, semesterId]);

  useEffect(() => {
    if (Array.isArray(availableTopics)) {
      setTopicStatuses(
        Object.fromEntries(availableTopics.map((topic) => [topic.id, topic.status]))
      );
    }
  }, [availableTopics]);

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      <div className="flex flex-1 flex-col gap-4">
        {availableTopics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào.</p>
        ) : (
          availableTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/topic-student-detail/${semesterId}/${topic.id}`)}
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://robohash.org/${encodeURIComponent(topic.nameEn || "Unknown")}.png?size=100x100`}
                  alt={topic.nameEn || "No Name"}
                />
                <AvatarFallback>{topic.nameEn ? topic.nameEn.charAt(0) : "?"}</AvatarFallback>
              </Avatar>

              {/* Nội dung đề tài */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-primary">
                    <span className="text-blue-500 font-medium">Topic:</span> {topic.nameEn || "Không có tên"}
                  </h4>

                  {/* Badge Trạng thái */}
                  <Badge
                    className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${statusVariants[topicStatuses[topic.id] as keyof typeof statusVariants] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {statusLabels[topicStatuses[topic.id] as keyof typeof statusLabels] || "Không xác định"}
                  </Badge>

                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {truncateText(topic.description || "Không có mô tả", 320)}
                </p>

                <div className="mt-2 text-xs text-muted-foreground">
                  <p>Ngày tạo: <span className="font-medium">{formatDate(topic.createdAt)}</span></p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
