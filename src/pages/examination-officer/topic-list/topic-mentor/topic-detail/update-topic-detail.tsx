import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicDetail, updateTopicForAcademic } from "@/lib/api/redux/topicSlice";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function UpdateTopicDetail() {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading, error } = useSelector((state: RootState) => state.topics);
  const { mentors } = useSelector((state: RootState) => state.mentors);

  const [formData, setFormData] = useState({
    mainMentorEmail: "",
    subMentorEmail: "",
    groupCode: "",
  });

  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicDetail({ topicId, semesterId }));
      dispatch(fetchMentorsBySemesterId(semesterId));
    }
  }, [dispatch, topicId, semesterId]);

  useEffect(() => {
    if (topicDetails) {
      // 🔍 Tìm email của mainSupervisor từ danh sách mentors
      const mainMentor = mentors.find(m => m.id === topicDetails.mainSupervisor)?.email || "";
      const subMentor = mentors.find(m => m.id === topicDetails.subSupervisor)?.email || "";

      setFormData({
        mainMentorEmail: mainMentor,
        subMentorEmail: subMentor,
        groupCode: topicDetails.group?.groupCode || "",
      });
    }
  }, [topicDetails, mentors]);

  const handleUpdate = async () => {
    if (!topicId || !semesterId) {
      toast.error("Thiếu thông tin cần thiết!");
      return;
    }

    const updatedData = {
      mainMentorEmail: formData.mainMentorEmail || null,
      subMentorEmail: formData.subMentorEmail || null,
      groupCode: formData.groupCode || "",
      semesterId,
    };

    try {
      console.log("🚀 Gửi API cập nhật bằng POST:", { topicId, updatedData });
      await dispatch(updateTopicForAcademic({ topicId, updatedData })).unwrap();
      toast.success("✅ Cập nhật đề tài thành công!");
      navigate(`/academic/topic-detail/${topicId}/${semesterId}`);
      dispatch(fetchTopicDetail({ topicId, semesterId }));
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật đề tài.");
    }
  };
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
            <div className="w-full">
              <Input value={topicDetails?.nameEn || ""} disabled />
              <p className="text-sm text-gray-500 italic mb-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên viết tắt</p>
                <Input value={topicDetails?.name || ""} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng Việt</p>
                <Input value={topicDetails?.nameVi || ""} disabled />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngành</p>
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
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                <Badge>{topicDetails?.status || "PENDING"}</Badge>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-1">Nhóm sinh viên</p>
                <Input
                  name="groupCode"
                  value={formData.groupCode}
                  onChange={(e) => setFormData({ ...formData, groupCode: e.target.value })}
                />
              </div>

              {/* 🔹 Select Mentor 1 (Hiển thị sẵn nếu có) */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 1</p>
                <Select
                  value={formData.mainMentorEmail || ""}
                  onValueChange={(email) => setFormData({ ...formData, mainMentorEmail: email })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn mentor chính" />
                  </SelectTrigger>
                  <SelectContent>
                    {mentors.length > 0 ? (
                      mentors.map((mentor) => (
                        <SelectItem key={mentor.email} value={mentor.email}>
                          {mentor.fullName} ({mentor.email})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        Không có mentor khả dụng
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* 🔹 Select Mentor 2 (Hiển thị sẵn nếu có) */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 2</p>
                <Select
                  value={formData.subMentorEmail || ""}
                  onValueChange={(email) => setFormData({ ...formData, subMentorEmail: email })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn mentor phụ" />
                  </SelectTrigger>
                  <SelectContent>
                    {mentors.length > 0 ? (
                      mentors.map((mentor) => (
                        <SelectItem key={mentor.email} value={mentor.email}>
                          {mentor.fullName} ({mentor.email})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        Không có mentor khả dụng
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
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
