import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicDetail } from "@/lib/api/redux/topicSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TopicDetail() {
  const { topicId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { topicDetails, loading, error } = useSelector(
    (state: RootState) => state.topics
  );

  useEffect(() => {
    if (topicId && (!topicDetails || topicDetails.id !== topicId)) {
      dispatch(fetchTopicDetail(topicId));
    }
  }, [dispatch, topicId, topicDetails]);

  if (loading)
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

  if (error && !topicDetails) {
    useEffect(() => {
      if (error) toast.error(error);
    }, [error]);
    return (
      <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>
    );
  }

  if (!topicDetails)
    return (
      <p className="text-center text-gray-500">
        Không tìm thấy đề tài hoặc đang tải...
      </p>
    );

  return (
    <div>
      <div className="mt-6 bg-white">
        <Card className="p-6">
          <div className="flex items-center mt-4 gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Topic Avatar"
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                ({topicDetails.nameEn || "Chưa có tên tiếng Anh"})
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
                <p className="text-sm text-gray-500 mb-1">Abbreviations</p>
                <p className="font-semibold italic">
                  {topicDetails.name || "Không có tên viết tắt"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Vietnamese Title</p>
                <p className="font-semibold italic">
                  {topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Profession</p>
                <p className="font-semibold italic">
                  {topicDetails.majorId || "Chưa có chuyên ngành"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <Badge>
                  {topicDetails.status || "Chưa cập nhật trạng thái"}
                </Badge>
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
            <Button variant="destructive">Xóa đề tài</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
