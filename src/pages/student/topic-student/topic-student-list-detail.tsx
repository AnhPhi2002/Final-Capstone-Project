import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetailFromList, registerTopic } from "@/lib/api/redux/topicStudentSlice";

export default function TopicStudentListDetail() {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topicStudents);

  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicDetailFromList({ topicId, semesterId }));
    }
  }, [dispatch, topicId, semesterId]);

  const handleRegister = async () => {
    if (!topicId || !semesterId) {
      toast.error("Thiếu thông tin đề tài hoặc học kỳ.");
      return;
    }
  
    // ✅ Kiểm tra xem nhóm đã đăng ký đề tài chưa
    if (topicDetails?.topicAssignments?.length > 0) {
      toast.error("Nhóm của bạn đã đăng ký đề tài này!");
      return; // 🚀 Không thay đổi state hoặc reload trang
    }
  
    try {
      await dispatch(registerTopic({ topicId, semesterId })).unwrap();
      toast.success("Đăng ký đề tài thành công! Chờ mentor duyệt.");
    } catch (err: any) {
      toast.error(err || "Có lỗi khi đăng ký đề tài.");
    }
  };
  

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài.</p>;

  return (
    <div className="p-6 bg-white">
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Topic Avatar" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {topicDetails.nameVi} ({topicDetails.nameEn})
            </h3>
            <p className="text-sm text-gray-500 italic">
              Mã đề tài: <strong>{topicDetails.topicCode}</strong>
            </p>
            <p className="text-sm text-gray-500 italic">
              Ngày tạo: {new Date(topicDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Abbreviations</p>
              <p className="font-semibold italic">{topicDetails.nameEn || "Không có tên viết tắt"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Vietnamese Title</p>
              <p className="font-semibold italic">{topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                {topicDetails.status || "Chưa cập nhật trạng thái"}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Mô tả</p>
            <p className="italic text-gray-800">{topicDetails.description || "Chưa có mô tả"}</p>
          </div>
        </CardContent>

        <div className="flex justify-between gap-4 mt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>Quay lại</Button>
          <Button variant="default" onClick={handleRegister}>Đăng ký đề tài</Button>
        </div>
      </Card>
    </div>
  );
}
