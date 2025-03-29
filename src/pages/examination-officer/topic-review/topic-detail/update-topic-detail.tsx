import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import {
  fetchTopicDetail,
  updateTopicStatus,
} from "@/lib/api/redux/topicSlice";
import { fetchUserById } from "@/lib/api/redux/authSlice";
import { toast } from "sonner";
import Header from "@/components/header";
import { Dot } from "lucide-react";

import { DataTableGroupTopic } from "./data-table-group-topic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Paragraph } from "@/components/ui/paragraph";
import { useAppSelector } from "@/hooks/reduxHooks";

// ✅ Trạng thái tiếng Việt
const getVietnameseStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "Đã duyệt";
    case "REJECTED":
      return "Từ chối";
    case "PENDING":
      return "Chờ duyệt";
    case "IMPROVED":
      return "Cần chỉnh sửa";
    default:
      return "Không xác định";
  }
};

// ✅ Màu theo trạng thái
const getStatusClass = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700 hover:bg-green-200";
    case "REJECTED":
      return "bg-red-100 text-red-700 hover:bg-red-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    case "IMPROVED":
      return "bg-black text-white hover:bg-zinc-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function UpdateReviewTopicDetail() {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { group } = useAppSelector((state) => state.groupDetail);

  const { topicDetails, loading, error } = useSelector(
    (state: RootState) => state.topics
  );
  const { author } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    status: "PENDING",
    reviewReason: "",
  });

  const statusOptions = ["PENDING", "APPROVED", "IMPROVED", "REJECTED"];

  // Fetch topic details
  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicDetail({ topicId, semesterId }));
    }
  }, [dispatch, topicId, semesterId]);

  // Fetch author info
  useEffect(() => {
    if (topicDetails?.createdBy && topicDetails?.semesterId) {
      dispatch(
        fetchUserById({
          userId: topicDetails.createdBy,
          semesterId: topicDetails.semesterId,
        })
      );
    }
  }, [dispatch, topicDetails?.createdBy, topicDetails?.semesterId]);

  // Set form data
  useEffect(() => {
    if (topicDetails) {
      setFormData({
        status: topicDetails.status || "PENDING",
        reviewReason: topicDetails.reviewReason || "",
      });
    }
  }, [topicDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, reviewReason: e.target.value });
  };

  const handleUpdate = async () => {
    if (!topicId || !semesterId) {
      toast.error("Lỗi: topicId hoặc semesterId không hợp lệ!");
      return;
    }

    try {
      await dispatch(
        updateTopicStatus({ topicId, updatedData: formData })
      ).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
      await dispatch(fetchTopicDetail({ topicId, semesterId })).unwrap();
      navigate(`/examination/review-topic-detail/${topicId}/${semesterId}`);
    } catch (err: any) {
      toast.error(err?.message || "Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };
  const handleOpenFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  }

  if (error && !topicDetails) {
    return (
      <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>
    );
  }

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
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Topic Avatar"
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {topicDetails.nameEn || "Chưa có tên tiếng Anh"}
              </h3>
              <Paragraph className="italic flex items-center gap-1">
                Ngày tạo:{" "}
                {topicDetails.createdAt
                  ? new Date(topicDetails.createdAt).toLocaleDateString()
                  : "Không xác định"}
                <Dot />
                <span>{author?.fullName || "Không có tác giả"}</span>
              </Paragraph>
            </div>
          </div>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Tên viết tắt
                </Label>
                <p className="italic font-semibold">
                  {topicDetails.name || "Không có tên viết tắt"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Tên tiếng Việt
                </Label>
                <p className="italic font-semibold">
                  {topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Chuyên ngành
                </Label>
                <p className="italic font-semibold">
                  {topicDetails.majors?.length > 0
                    ? topicDetails.majors.map((m) => m.name).join(", ")
                    : "Chưa có chuyên ngành"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger
                    className={`w-full max-w-xs ${getStatusClass(
                      formData.status
                    )}`}
                  >
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {getVietnameseStatus(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Giảng viên hướng dẫn 1
                </Label>
                <p className="font-semibold italic">
                  {author?.email ? (
                    <span className="text-blue-600">{author.email}</span>
                  ) : (
                    <span className="text-red-500">
                      Chưa có giảng viên hướng dẫn 1
                    </span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Giảng viên hướng dẫn 2
                </Label>
                <p className="font-semibold italic">
                  {topicDetails.subMentor?.email ? (
                    <span className="text-blue-600">
                      {topicDetails.subMentor.email}
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Chưa có giảng viên hướng dẫn 2
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <Label className="text-sm text-gray-500 mb-1">Tài liệu</Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {topicDetails.documents && topicDetails.documents.length > 0 ? (
                  topicDetails.documents.map((doc, index) => (
                    <button
                      key={index}
                      onClick={() => handleOpenFile(doc.fileUrl)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                    >
                      📄 {doc.fileName || "Tài liệu"}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Chưa có tài liệu</p>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-1">
                Bối cảnh đề tài
              </Label>
              <p className="italic font-semibold text-gray-800">
                {topicDetails.description || "Chưa có mô tả"}
              </p>
            </div>
            
            <div className="pt-6">
              <h2 className="text-lg font-semibold mb-3 ">
                Danh sách nhóm:{" "}
                <span className="italic font-semibold text-gray-800">
                  {group?.groupCode}
                </span>
              </h2>
              <DataTableGroupTopic groupId={topicDetails.group?.id} />
            </div>

            <div>
              <Label className="text-sm text-gray-500 mb-1">
                Lý do xét duyệt
              </Label>
              <Textarea
                name="reviewReason"
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
