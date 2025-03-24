import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetail } from "@/lib/api/redux/topicSlice"; // Sử dụng fetchTopicDetail từ topicSlice
import { fetchUserById} from "@/lib/api/redux/authSlice";
import { fetchSubUserById} from "@/lib/api/redux/authSubSlice";


export default function TopicGroupRegisterDetail() {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topics);

  const { author: mainMentor } = useSelector((state: RootState) => state.auth);
  const { author: subMentor } = useSelector((state: RootState) => state.authSub);

  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicDetail({ topicId, semesterId }));
    }
  }, [dispatch, topicId, semesterId]);

  // Fetch mentors when topicDetails is updated
  useEffect(() => {
    if (topicDetails?.mainSupervisor && semesterId) {
      dispatch(fetchUserById({ userId: topicDetails.mainSupervisor, semesterId }));
    }
    if (topicDetails?.subSupervisor && semesterId) {
      dispatch(fetchSubUserById({ userId: topicDetails.subSupervisor, semesterId }));
    }
  }, [dispatch, topicDetails?.mainSupervisor, topicDetails?.subSupervisor, semesterId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>;
  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài.</p>;

  const handleOpenFile = (fileUrl: string) => {
    // Mở URL trong tab mới
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-6 bg-white">
      <Card className="p-6">
        <div className="flex items-center mt-4 gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Topic Avatar" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {topicDetails.nameEn || "Chưa có tên tiếng Anh"}
            </h3>
            <p className="text-sm text-gray-500 italic">
              Created at:{" "}
              {topicDetails.createdAt
                ? new Date(topicDetails.createdAt).toLocaleDateString()
                : "Không xác định"}
            </p>
          </div>
        </div>
        <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên viết tắt</p>
                <p className="font-semibold italic">
                  {topicDetails.name || "Không có tên viết tắt"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng việt</p>
                <p className="font-semibold italic">
                  {topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngành</p>
                <p className="font-semibold italic">
                  {topicDetails.majorId || "Chưa có chuyên ngành"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                <Badge>
                  {topicDetails.status || "Chưa cập nhật trạng thái"}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 1</p>
                <p className="font-semibold italic">
                  {mainMentor?.email ? (
                    <span className="text-blue-600">{mainMentor.email}</span>
                  ) : (
                    <span className="text-red-500">Chưa có mentor 1</span>
                  )}
                </p>
              </div>
              {/* 🔹 Thêm phần hiển thị Mentor phụ */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 2</p>
                <p className="font-semibold italic">
                  {subMentor?.email ? (
                    <span className="text-blue-600">{subMentor.email}</span>
                  ) : (
                    <span className="text-red-500">Chưa có mentor 2</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tài liệu</p>
                {topicDetails.documents && topicDetails.documents.length > 0 ? (
                  topicDetails.documents.map((doc, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="mr-2 mb-2"
                      onClick={() => handleOpenFile(doc.fileUrl)}
                    >
                      Xem {doc.fileName || "Tài liệu"}
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Chưa cập nhật trạng thái</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <p className="italic text-gray-800">
                {topicDetails.description || "Chưa có mô tả"}
              </p>
            </div>
          </CardContent>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </div>
      </Card>
    </div>
  );
}
