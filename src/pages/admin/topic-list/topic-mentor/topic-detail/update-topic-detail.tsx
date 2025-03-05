import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { Textarea } from "@/components/ui/textarea";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetail, updateTopic } from "@/lib/api/redux/topicSlice";
import { toast } from "sonner";

export default function UpdateTopicDetail() {
  const { topicId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading } = useSelector(
    (state: RootState) => state.topics
  );

  const [formData, setFormData] = useState({
    name: "",
    nameVi: "",
    nameEn: "",
    majorId: "",
    status: "",
    description: "",
  });

  // Khi component mount, fetch topic detail nếu chưa có dữ liệu
  useEffect(() => {
    if (topicId) {
      console.log("📌 Fetching topicDetail với topicId:", topicId);
      dispatch(fetchTopicDetail(topicId));
    } else {
      console.error("❌ Không có topicId, không thể fetch dữ liệu!");
    }
  }, [dispatch, topicId]);

  // Cập nhật state khi topicDetails thay đổi
  useEffect(() => {
    if (topicDetails) {
      setFormData({
        name: topicDetails.name || "",
        nameVi: topicDetails.nameVi || "",
        nameEn: topicDetails.nameEn || "",
        majorId: topicDetails.majorId || "",
        status: topicDetails.status || "PENDING",
        description: topicDetails.description || "",
      });
    }
  }, [topicDetails]);

  // Xử lý nhập liệu
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!topicId) {
      console.error("❌ Không có topicId, không thể cập nhật!");
      return;
    }

    console.log("🟢 Bắt đầu cập nhật đề tài...");
    console.log("🔍 Dữ liệu gửi lên API:", formData); // Kiểm tra dữ liệu trước khi gửi

    try {
      await dispatch(updateTopic({ topicId, updatedData: formData })).unwrap();
      toast.success("Cập nhật đề tài thành công!");
      navigate(`/topic-detail/${topicId}`);
    } catch (err: any) {
      console.error("❌ Lỗi khi cập nhật:", err);
      toast.error(err || "Có lỗi xảy ra khi cập nhật đề tài.");
    }
  };

  return (
    <div>
      <Header title="" href="/" currentPage="Cập nhật đề tài" />
      <div className="p-6 mt-10 bg-white">
        <Card className="p-6">
          {/* Header với Avatar giống TopicDetail */}
          <div className="flex items-center mt-4 gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Topic Avatar"
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Input
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 italic mb-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Abbreviations</p>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Vietnamese Title</p>
                <Input
                  name="nameVi"
                  value={formData.nameVi}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Profession</p>
                <Input
                  name="majorId"
                  value={formData.majorId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <Badge>{formData.status}</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <Textarea
                name="description"
                className="w-full p-2 border rounded-md h-24"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </CardContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              onClick={() => {
                console.log("🟢 Đã bấm vào nút Lưu");
                handleUpdate();
              }}
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
