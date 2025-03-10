import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetail, updateTopicStatus } from "@/lib/api/redux/topicSlice";
import { toast } from "sonner";

export default function UpdateReviewTopicDetail() {
  const { topicId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading } = useSelector(
    (state: RootState) => state.topics
  );

  const [formData, setFormData] = useState({
    status: "PENDING", 
    reviewReason: "",
  });

  // Danh sách trạng thái có thể chọn
  const statusOptions = ["PENDING", "APPROVED", "REJECTED"];

  useEffect(() => {
    if (topicId) {
      dispatch(fetchTopicDetail(topicId));
    }
  }, [dispatch, topicId]);

  useEffect(() => {
    if (topicDetails) {
      setFormData({
        status: topicDetails.status || "PENDING",
        reviewReason: topicDetails.reviewReason || "",
      });
    }
  }, [topicDetails]);

  // Xử lý thay đổi trạng thái
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, status: e.target.value });
  };

  // Xử lý nhập liệu cho reviewReason
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!topicId || topicId === ":topicId") {
      toast.error("Lỗi: topicId không hợp lệ!");
      return;
    }
  
    try {
      await dispatch(updateTopicStatus({ topicId, updatedData: formData })).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
  

      dispatch(fetchTopicDetail(topicId));
  
      navigate(`/review-topic-detail/${topicId}`); 
    } catch (err: any) {
      toast.error(err || "Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };
  
  

  return (
    <div>
      <Header title="" href="/" currentPage="Cập nhật đề tài" />
      <div className="p-6 mt-10 bg-white">
        <Card className="p-6">
          <div className="flex items-center mt-4 gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Topic Avatar"
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Input name="nameEn" value={topicDetails?.nameEn || ""} disabled />
              <p className="text-sm text-gray-500 italic mb-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Abbreviations</p>
                <Input name="name" value={topicDetails?.name || ""} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Vietnamese Title</p>
                <Input name="nameVi" value={topicDetails?.nameVi || ""} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Profession</p>
                <Input name="majorId" value={topicDetails?.majorId || ""} disabled />
              </div>

              {/* ✅ Thay thế Badge bằng Select để chọn status */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                  className="border p-2 rounded-md w-full"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ✅ Textarea để nhập reviewReason */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Lý do xét duyệt</p>
              <Textarea
                name="reviewReason"
                className="w-full p-2 border rounded-md h-24"
                value={formData.reviewReason}
                onChange={handleChange}
              />
            </div>
          </CardContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
