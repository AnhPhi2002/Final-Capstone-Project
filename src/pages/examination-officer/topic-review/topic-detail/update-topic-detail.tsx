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
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topics);
  const { author } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    status: "PENDING",
    reviewReason: "",
  });

  const statusOptions = ["PENDING", "APPROVED", "IMPROVED", "REJECTED"];

  // Fetch topic detail khi component mount
  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicDetail({ topicId, semesterId }));
    }
  }, [dispatch, topicId, semesterId]);

  // Cập nhật formData khi topicDetails thay đổi
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

  // Xử lý thay đổi lý do xét duyệt
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, reviewReason: e.target.value });
  };

  // Xử lý cập nhật trạng thái
  const handleUpdate = async () => {
    if (!topicId || !semesterId) {
      toast.error("Lỗi: topicId hoặc semesterId không hợp lệ!");
      return;
    }

    try {
      await dispatch(updateTopicStatus({ topicId, updatedData: formData })).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
      await dispatch(fetchTopicDetail({ topicId, semesterId })).unwrap(); // Refresh dữ liệu
      navigate(`/examination/review-topic-detail/${topicId}/${semesterId}`);
    } catch (err: any) {
      toast.error(err?.message || "Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  // Hiển thị khi đang tải
  if (loading) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  // Hiển thị khi có lỗi
  if (error && !topicDetails) {
    return <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>;
  }

  // Hiển thị khi không có dữ liệu
  if (!topicDetails) {
    return (
      <p className="text-center text-gray-500">
        Không tìm thấy đề tài hoặc đang tải...
      </p>
    );
  }

  return (
    <div>
      <Header title="" href="/" currentPage="Cập nhật đề tài" />
      <div className="p-6 mt-10 bg-white">
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
                  : "Không xác định"}{" "}
                by {author?.fullName || "Không có tác giả"}
              </p>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên viết tắt</p>
                <Input value={topicDetails.name || "Không có tên viết tắt"} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng Việt</p>
                <Input value={topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng Anh</p>
                <Input value={topicDetails.nameEn || "Chưa có tên tiếng Anh"} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Chuyên ngành</p>
                <Input
                  value={
                    topicDetails.majors?.length > 0
                      ? topicDetails.majors.map((major) => major.name).join(", ")
                      : "Chưa có chuyên ngành"
                  }
                  disabled
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 1</p>
                <Input value={author?.email || "Chưa có mentor 1"} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 2</p>
                <Input
                  value={topicDetails.subMentor?.email || "Chưa có mentor 2"}
                  disabled
                />
              </div>
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

            <div>
              <p className="text-sm text-gray-500 mb-1">Lý do xét duyệt</p>
              <Textarea
                name="reasons"
                className="w-full p-2 border rounded-md h-24"
                value={formData.reviewReason}
                onChange={handleChange}
                placeholder="Nhập lý do xét duyệt..."
              />
            </div>
          </CardContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" onClick={handleUpdate} disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}