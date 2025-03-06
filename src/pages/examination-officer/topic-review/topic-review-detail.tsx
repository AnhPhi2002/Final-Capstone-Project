import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicDetail } from "@/lib/api/redux/topicSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { UpdateTopic } from "./updateTopic";
import { toast } from "sonner";

export default function TopicReviewDetail() {
  const { topicId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topics);

  console.log("Rendering TopicDetail", topicDetails);

  useEffect(() => {
    if (topicId && (!topicDetails || topicDetails.id !== topicId)) {
      console.log("Fetching topic details for ID:", topicId);
      dispatch(fetchTopicDetail(topicId));
    }
  }, [dispatch, topicId, topicDetails]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

  if (error && !topicDetails) {
    useEffect(() => {
      if (error) toast.error(error);
    }, [error]);

    return <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>;
  }

  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài hoặc đang tải...</p>;

  return (
    <div className="p-6 bg-white">
      <Card className="p-6">
        <h3 className="text-xl font-semibold">{topicDetails.nameVi} ({topicDetails.nameEn})</h3>
        <p>{topicDetails.description || "Chưa có mô tả"}</p>
        <p>Trạng thái: <Badge>{topicDetails.status}</Badge></p>
        <p>Ngày tạo: {new Date(topicDetails.createdAt).toLocaleDateString()}</p>
        <p>Người tạo: {topicDetails.creator?.fullName || "Không xác định"} ({topicDetails.creator?.email || "Không có email"})</p>
        
        <div className="flex gap-4 mt-6">
       
          <Button variant="destructive">Xóa đề tài</Button>
        </div>
      </Card>
    </div>
  );
}
