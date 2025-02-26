import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics } from "@/lib/api/redux/topicSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // ✅ Import Badge

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// ✅ Hàm format ngày tháng năm
const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};

export const TopicList = ({ selectedMajor }: { selectedMajor?: string }) => {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: topics = [], loading: topicsLoading } = useSelector(
    (state: RootState) => state.topics
  );

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor }));
    }
  }, [dispatch, semesterId, selectedMajor]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border border-green-300 hover:bg-green-100"; 
      case "PENDING":
        return "bg-blue-50 text-blue-600 border border-blue-300 hover:bg-blue-100"; 
      case "Closed":
        return "bg-red-50 text-red-600 border border-red-300 hover:bg-red-100"; 
      default:
        return "bg-gray-50 text-gray-600 border border-gray-300 hover:bg-gray-100"; 
    }
  };
  

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-1 flex-col gap-4">
        {topicsLoading ? (
          <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
        ) : topics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào trong học kỳ này.</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/topic-detail/${topic.id}`)}
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              <Badge className={`absolute top-5 right-6 px- py-1 rounded-md text-xs ${getStatusBadge(topic.status)}`}>
                {topic.status}
              </Badge>

              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://robohash.org/${encodeURIComponent(topic.name)}.png?size=100x100`}
                  alt={topic.name}
                />
                <AvatarFallback>{topic.name.charAt(0)}</AvatarFallback>
              </Avatar>

              {/* Nội dung đề tài */}
              <div className="flex-1  ">
                <h4 className="font-semibold text-lg text-primary">
                  <span className="text-blue-500 font-medium">Topic:</span> {topic.name}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {truncateText(topic.description, 320)}
                </p>

                <div className="mt-2 text-xs text-muted-foreground">
                  <p>
                    Ngày tạo:{" "}
                    <span className="font-medium">{formatDate(topic.createdAt)}</span>
                  </p>

                  <p>
                    Được tạo bởi:{" "}
                    <span className="font-medium">{topic.creator?.fullName || "Không xác định"}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
