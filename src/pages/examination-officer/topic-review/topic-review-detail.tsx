import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetail } from "@/lib/api/redux/topicSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/header";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpdateTopic } from "./updateTopic";


export default function TopicReviewDetail() {
  const { topicId } = useParams(); 
  const dispatch = useDispatch<AppDispatch>();

  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topics);

  useEffect(() => {
    if (topicId) {
      dispatch(fetchTopicDetail(topicId));
    }
  }, [dispatch, topicId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) {
    toast.error(error);
    return <p className="text-center text-red-500">Lỗi khi tải đề tài</p>;
  }
  if (!topicDetails) return <p className="text-center text-gray-500">Không tìm thấy đề tài.</p>;

  return (
    <div>
      <Header title="Tổng quan" href="/topic" currentPage="Chi tiết đề tài" />
      <div className="p-6 bg-white">
        <Card className="p-6">
          {/* Thông tin chung */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={topicDetails.creator?.avatar || "https://github.com/shadcn.png"} alt="Creator Avatar" />
              <AvatarFallback>{topicDetails.creator?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{topicDetails.name}</h3>
              <p className="text-sm text-gray-500 italic">Mã đề tài: {topicDetails.topicCode}</p>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Mô tả</p>
                  <p className="italic text-gray-800">{topicDetails.description || "Chưa có mô tả"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <Badge variant="outline" className="text-sm">{topicDetails.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kỳ học</p>
                  <p className="font-semibold italic">{topicDetails.semester.code}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(topicDetails.semester.startDate).toLocaleDateString()} - {new Date(topicDetails.semester.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngành học</p>
                  <ul className="list-disc pl-4">
                    {topicDetails.detailMajorTopics.map((detail, index) => (
                      <li key={index} className="font-semibold italic">{detail.major.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Người tạo</p>
                  <p className="font-semibold">{topicDetails.creator.fullName}</p>
                  <p className="text-sm text-gray-500">{topicDetails.creator.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Ngày tạo</p>
                  <p className="font-semibold">{new Date(topicDetails.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nguồn đề tài</p>
                  <p className="font-semibold">
                    {topicDetails.isBusiness ? `Doanh nghiệp (${topicDetails.businessPartner || "Không rõ"})` : "Nội bộ"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng Thái</p>
                  <p className="font-semibold">
                    {topicDetails.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Danh sách đăng ký</p>
                  {topicDetails.topicRegistrations.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {topicDetails.topicRegistrations.map((registration, index) => (
                        <li key={index} className="font-semibold">
                          {registration.role === "mentor" ? "Mentor" : "Reviewer"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Chưa có ai đăng ký.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tài liệu đính kèm */}
            <div className="mt-6">
              <p className="text-sm text-gray-500">Tài liệu đính kèm</p>
              {topicDetails.documents.length > 0 ? (
                <ul className="list-disc pl-4">
                  {topicDetails.documents.map((doc, index) => (
                    <li key={index}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Không có tài liệu đính kèm.</p>
              )}
            </div>

            {/* Nút chỉnh sửa hoặc xóa đề tài */}
            <div className="flex gap-4 mt-6">
              <UpdateTopic topicId={topicDetails.id}/>
              <Button variant="destructive">Xóa đề tài</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
