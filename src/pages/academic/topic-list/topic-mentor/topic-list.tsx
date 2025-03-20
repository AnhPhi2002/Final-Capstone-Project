import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics } from "@/lib/api/redux/topicSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { resetSubMentor } from "@/lib/api/redux/authSubSlice";
import { resetMainMentor } from "@/lib/api/redux/authSlice";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// ✅ Hàm format ngày tháng năm
const formatDate = (dateString?: string) => {
  if (!dateString) return "Không có ngày"; // Trả về giá trị mặc định nếu null

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Ngày không hợp lệ"; // Kiểm tra nếu `date` không hợp lệ

  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};


// ✅ Cập nhật class cho Badge theo trạng thái
const statusClasses: { [key in "ACTIVE" | "COMPLETE" | "PENDING"]: string } = {
  "ACTIVE": "bg-green-100 text-green-600 hover:bg-green-200",
  "COMPLETE": "bg-blue-100 text-blue-600 hover:bg-blue-200",
  "PENDING": "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

export const TopicList = ({ selectedMajor }: { selectedMajor?: string }) => {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: topics = [], loading: topicsLoading } = useSelector(
    (state: RootState) => state.topics
  );

  useEffect(() => {
              dispatch(resetMainMentor()); 
              dispatch(resetSubMentor());
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor } as any));
    }
  }, [dispatch, semesterId, selectedMajor, topics.length]); // Theo dõi topics.length
  

  return (
    <div className="bg-background text-foreground min-h-scree">
      <div className="flex flex-1 flex-col gap-4">
        {topicsLoading ? (
          <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
        ) : topics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào trong học kỳ này.</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/academic/topic-detail/${topic.id}/${semesterId}`)}
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              <Badge className={`${statusClasses[topic.status as "ACTIVE" | "COMPLETE" | "PENDING"] || "bg-gray-100 text-gray-600 hover:bg-gray-200"} absolute top-4 right-6 px-2 py-1 rounded-md text-xs`}>
                {topic.status}
              </Badge>

              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://robohash.org/${encodeURIComponent(topic.name || "Unknown")}.png?size=100x100`}
                  alt={topic.name || "No Name"}
                />
                <AvatarFallback>{topic.name ? topic.name.charAt(0) : "?"}</AvatarFallback>
              </Avatar>

              {/* Nội dung đề tài */}
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-primary ">
                  <span className="text-blue-500 font-medium ">Topic:</span> {topic.nameEn || "Không có tên"}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {truncateText(topic.description || "Không có mô tả", 320)}
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
