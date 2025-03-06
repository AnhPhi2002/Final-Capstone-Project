import { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate để điều hướng
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const statusLabels = {
  REGISTERED: "Đăng ký",
  PENDING_REVIEW: "Chờ xét duyệt",
  REJECTED: "Từ chối",
};

const statusVariants = {
  REGISTERED: "bg-green-100 text-green-700 border border-green-500 hover:bg-green-200 cursor-pointer",
  PENDING_REVIEW: "bg-yellow-100 text-yellow-700 border border-yellow-500 hover:bg-yellow-200 cursor-pointer",
  REJECTED: "bg-red-100 text-red-700 border border-red-500 hover:bg-red-100 cursor-not-allowed",
};

// Dữ liệu mẫu
const sampleTopics = [
  {
    id: "1",
    name: "AI Research",
    nameEn: "Artificial Intelligence in Healthcare",
    description: "Nghiên cứu về ứng dụng AI trong lĩnh vực chăm sóc sức khỏe...",
    status: "REGISTERED",
    createdAt: "2024-02-10T08:30:00Z",
    creator: { fullName: "Nguyễn Văn A" },
  },
  {
    id: "2",
    name: "Blockchain",
    nameEn: "Decentralized Finance (DeFi)",
    description: "Khám phá hệ sinh thái tài chính phi tập trung và ứng dụng blockchain...",
    status: "PENDING_REVIEW",
    createdAt: "2024-03-01T12:15:00Z",
    creator: { fullName: "Trần Thị B" },
  },
  {
    id: "3",
    name: "Cybersecurity",
    nameEn: "Ethical Hacking & Penetration Testing",
    description: "Phân tích lỗ hổng bảo mật và thử nghiệm xâm nhập hệ thống...",
    status: "REJECTED",
    createdAt: "2024-01-20T10:45:00Z",
    creator: { fullName: "Lê Văn C" },
  },
];

export const TopicStudentList = ({ topics = sampleTopics }) => {
  const navigate = useNavigate(); // Hook điều hướng

  const [topicStatuses, setTopicStatuses] = useState<{ [key: string]: "REGISTERED" | "PENDING_REVIEW" | "REJECTED" }>(
    Object.fromEntries(topics.map((topic) => [topic.id, topic.status as "REGISTERED" | "PENDING_REVIEW" | "REJECTED"]))
  );

  const handleRegisterClick = (id: string) => {
    if (topicStatuses[id] === "REGISTERED") {
      setTopicStatuses((prev) => ({
        ...prev,
        [id]: "PENDING_REVIEW",
      }));
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      <div className="flex flex-1 flex-col gap-4">
        {topics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào.</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/topic-student-detail/${topic.id}`)} // Chuyển hướng khi click vào đề tài
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
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
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-primary">
                    <span className="text-blue-500 font-medium">Topic:</span> {topic.nameEn || "Không có tên"}
                  </h4>

                  {/* Badge Trạng thái có thể Click */}
                  <Badge
                    className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${statusVariants[topicStatuses[topic.id]]}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn sự kiện click lan ra toàn bộ thẻ
                      handleRegisterClick(topic.id);
                    }}
                  >
                    {statusLabels[topicStatuses[topic.id]]}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {truncateText(topic.description || "Không có mô tả", 320)}
                </p>

                <div className="mt-2 text-xs text-muted-foreground">
                  <p>
                    Ngày tạo: <span className="font-medium">{formatDate(topic.createdAt)}</span>
                  </p>

                  <p>
                    Được tạo bởi: <span className="font-medium">{topic.creator?.fullName || "Không xác định"}</span>
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
