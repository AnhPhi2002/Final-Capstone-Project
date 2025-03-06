import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Dữ liệu mẫu
const sampleTopics = [
  {
    id: "1",
    nameVi: "Nghiên cứu AI trong y tế",
    nameEn: "Artificial Intelligence in Healthcare",
    description: "Ứng dụng AI trong chẩn đoán bệnh và hỗ trợ y tế.",
    majorId: "Công nghệ thông tin",
    status: "Chờ xét duyệt",
    createdAt: "2024-03-06T10:30:00Z",
    creator: { fullName: "Nguyễn Văn A", email: "nguyenvana@example.com" },
  },
  {
    id: "2",
    nameVi: "Blockchain trong tài chính",
    nameEn: "Decentralized Finance (DeFi)",
    description: "Cách mạng hóa ngành tài chính bằng công nghệ blockchain.",
    majorId: "Tài chính",
    status: "Đăng ký",
    createdAt: "2024-02-20T09:15:00Z",
    creator: { fullName: "Trần Thị B", email: "tranthib@example.com" },
  },
];

export default function TopicStudentListDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Giả lập API delay
    setTimeout(() => {
      const foundTopic = sampleTopics.find((t) => t.id === topicId);
      if (foundTopic) {
        setTopic(foundTopic);
        setError(null);
      } else {
        setTopic(null);
        setError("Không tìm thấy đề tài.");
        toast.error("Không tìm thấy đề tài.");
      }
      setLoading(false);
    }, 800); // Giả lập độ trễ 0.8 giây để kiểm tra loading UI
  }, [topicId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!topic) return <p className="text-center text-gray-500">Không tìm thấy đề tài.</p>;

  return (
    <div className="p-6 bg-white">
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Topic Avatar"
            />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {topic.nameVi} ({topic.nameEn})
            </h3>
            <p className="text-sm text-gray-500 italic">
              Created at: {new Date(topic.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Abbreviations</p>
              <p className="font-semibold italic">
                {topic.nameEn || "Không có tên viết tắt"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Vietnamese Title</p>
              <p className="font-semibold italic">
                {topic.nameVi || "Chưa có tiêu đề tiếng Việt"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Profession</p>
              <p className="font-semibold italic">
                {topic.majorId || "Chưa có chuyên ngành"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md">
                {topic.status || "Chưa cập nhật trạng thái"}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Description</p>
            <p className="italic text-gray-800">
              {topic.description || "Chưa có mô tả"}
            </p>
          </div>
        </CardContent>

        <div className="flex justify-between gap-4 mt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Button variant="destructive">Xóa đề tài</Button>
        </div>
      </Card>
    </div>
  );
}
