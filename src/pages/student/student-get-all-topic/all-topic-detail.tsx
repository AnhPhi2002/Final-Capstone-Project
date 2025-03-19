import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicStudentDetailFromList } from "@/lib/api/redux/topicStudentSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataTableGroupTopic } from "./DataTableGroupTopic";
import { resetGroupDetail } from "@/lib/api/redux/groupDetailSlice";

export default function AllTopicDetail() {
  const { topicId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading, error } = useSelector(
    (state: RootState) => state.topicStudents
  );

  useEffect(() => {
    dispatch(resetGroupDetail());
    if (topicId) {
      dispatch(fetchTopicStudentDetailFromList(topicId));
    }
  }, [dispatch, topicId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>;
  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài hoặc đang tải...</p>;

  const handleOpenFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <div className="mt-6 bg-white">
        <Card className="p-6">
          <div className="flex items-center mt-4 gap-3">
            {/* Avatar */}
            <Avatar className="w-12 h-12">
              <AvatarImage src={`https://robohash.org/${encodeURIComponent(topicDetails.nameEn || "Unknown")}.png?size=100x100`} alt="Topic Avatar" />
              <AvatarFallback>{topicDetails.nameEn?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-xl font-bold text-gray-900">{topicDetails.nameEn || "Không có tên"}</h3>
              <p className="text-sm text-gray-500 italic">
                Ngày tạo: {new Date(topicDetails.semester.startDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {/* Nội dung chính */}
          <CardContent className="p-4 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng Anh</p>
                <p className="font-semibold italic">{topicDetails.nameEn || "Chưa có tiêu đề tiếng Anh"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng Việt</p>
                <p className="font-semibold italic">{topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Mã Đề Tài</p>
                <p className="font-semibold italic">{topicDetails.topicCode || "Không có mã"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                <Badge>{topicDetails.status || "Chưa cập nhật trạng thái"}</Badge>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Ngành học</p>
                <p className="font-semibold italic">
                  {topicDetails.majors.map((m) => m.name).join(", ") || "Không có ngành"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 1</p>
                <p className="font-semibold italic">
                  {topicDetails.createdBy?.fullName || "Không xác định"} - {topicDetails.createdBy?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 2</p>
                <p className="font-semibold italic">
                  {topicDetails.subSupervisor || "Chưa có mentor phụ"}
                </p>
              </div>
            </div>

            {/* Hiển thị mô tả */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Mô tả</p>
              <p className="italic text-gray-800">{topicDetails.description || "Chưa có mô tả"}</p>
            </div>

``

            {/* Hiển thị tài liệu */}
            {/* {topicDetails.documents && topicDetails.documents.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Tài liệu</p>
                {topicDetails.documents.map((doc, index) => (
                  <Button key={index} variant="outline" className="mr-2 mb-2" onClick={() => handleOpenFile(doc.fileUrl)}>
                    Xem {doc.fileName || "Tài liệu"}
                  </Button>
                ))}
              </div>
            )} */}
          </CardContent>

          {/* Bảng nhóm */}
          {topicDetails.group?.id && <DataTableGroupTopic />}

          {/* Nút hành động */}
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>Quay lại</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
