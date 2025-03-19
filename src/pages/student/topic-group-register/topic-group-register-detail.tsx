import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicGroupDetailFromList } from "@/lib/api/redux/topicGroupRegisterSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TopicGroupRegisterDetail() {
  const { topicId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { topicDetails, loading, error } = useSelector(
    (state: RootState) => state.topicGroupRegister
  );

  useEffect(() => {
    if (topicId) {
      dispatch(fetchTopicGroupDetailFromList(topicId));
    }
  }, [dispatch, topicId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;
  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài.</p>;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        {/* Avatar đại diện cho đề tài */}
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={`https://robohash.org/${encodeURIComponent(topicDetails.nameEn || "Unknown")}.png`}
            alt="Topic Avatar"
          />
          <AvatarFallback>{topicDetails.nameEn?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>

        {/* Tên đề tài */}
        <div>
          <h3 className="text-xl font-bold">{topicDetails.nameEn || "Không có tên"}</h3>
          <p className="text-sm text-gray-500">{topicDetails.topicCode || "Không có mã đề tài"}</p>
        </div>
      </div>

      {/* Nội dung chi tiết */}
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Tên tiếng Việt</p>
            <p className="font-semibold italic">{topicDetails.nameVi || "Không có tiêu đề"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Trạng thái phê duyệt</p>
            <Badge
              className={
                topicDetails.approvalStatus === "APPROVED"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }
            >
              {topicDetails.approvalStatus || "Không có thông tin"}
            </Badge>
          </div>

          
          <div>
            <p className="text-sm text-gray-500 mb-1">Mentor 1</p>
            <p className="font-semibold italic">
              {topicDetails.createdBy?.fullName || "Chưa có mentor 1"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Mentor 2</p>
            <p className="font-semibold italic">
              {topicDetails.subSupervisor?.fullName || "Chưa có mentor 2"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Ngành học</p>
            <p className="font-semibold italic">
              {topicDetails.majors.map((m) => m.name).join(", ") || "Không có ngành"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Mô tả</p>
          <p className="italic text-gray-800">{topicDetails.description || "Không có mô tả"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
