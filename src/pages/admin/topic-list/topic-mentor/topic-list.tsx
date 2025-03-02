import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetail } from "@/lib/api/redux/topicSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { UpdateTopic } from "./updateTopic";
import { toast } from "sonner";

export default function TopicDetail() {
  const { topicId } = useParams(); 
  const dispatch = useDispatch<AppDispatch>();
  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topics);

  useEffect(() => {
    if (topicId && !topicDetails) {
      dispatch(fetchTopicDetail(topicId));
    }
  }, [dispatch, topicId, topicDetails]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) {
    toast.error(error);
    return <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>;
  }
  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài.</p>;

  return (
    <div className="p-6 bg-white">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{topicDetails.nameVi} ({topicDetails.nameEn})</h3>
        <p className="text-sm text-gray-500">{topicDetails.description || "Chưa có mô tả"}</p>
        <p className="text-sm text-gray-500">Nguồn đề tài: {topicDetails.source}</p>
        <p className="text-sm text-gray-500">Trạng thái: <Badge>{topicDetails.status}</Badge></p>
        <p className="text-sm text-gray-500">Ngày tạo: {new Date(topicDetails.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">
          Người tạo: {topicDetails.creator?.fullName || "Không xác định"} ({topicDetails.creator?.email || "Không có email"})
        </p>

        {topicDetails.documents.length > 0 && (
          <div>
            <p className="text-sm text-gray-500">Tài liệu đính kèm:</p>
            <ul>
              {topicDetails.documents.map((doc, index) => (
                <li key={index}>
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {doc.fileName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          {/* <UpdateTopic topicId={topicDetails.id} /> */}
          <Button variant="destructive">Xóa đề tài</Button>
        </div>
      </Card>
    </div>
  );
}
