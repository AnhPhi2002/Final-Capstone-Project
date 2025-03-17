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
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice"; // ✅ Fetch mentor
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";


export default function UpdateTopicDetail() {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { topicDetails, loading } = useSelector((state: RootState) => state.topics);
  const { mentors } = useSelector((state: RootState) => state.mentors); // ✅ Danh sách mentor

  const [formData, setFormData] = useState({
    name: "",
    nameVi: "",
    nameEn: "",
    majorId: "",
    status: "",
    description: "",
    subMentorEmail: "", 
    groupCode: "",
  });

  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicDetail({ topicId, semesterId }));
      dispatch(fetchMentorsBySemesterId(semesterId)); // ✅ Fetch danh sách mentor
    }
  }, [dispatch, topicId, semesterId]);

  useEffect(() => {
    if (topicDetails) {
      setFormData({
        name: topicDetails.name || "",
        nameVi: topicDetails.nameVi || "",
        nameEn: topicDetails.nameEn || "",
        majorId: topicDetails.majorId || "",
        status: topicDetails.status || "PENDING",
        description: topicDetails.description || "",
        subMentorEmail: topicDetails.subMentor?.email || "", 
        groupCode: topicDetails.group?.groupCode || "",
      });
    }
  }, [topicDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!topicId || !semesterId) {
      toast.error("Thiếu thông tin cần thiết!");
      return;
    }
  
    let subMentorId = topicDetails?.subSupervisorEmail || null;
  
    // 🔹 Nếu chọn mentor mới, tìm ID từ danh sách mentor
    if (formData.subMentorEmail && formData.subMentorEmail !== topicDetails?.subMentor?.email) {
      const selectedMentor = mentors.find(m => m.email === formData.subMentorEmail);
      if (selectedMentor) {
        subMentorId = selectedMentor.id;
      }
    }
  
    const updatedData = {
      ...formData,
      subSupervisor: subMentorId, // ✅ Cập nhật subSupervisor là ID của subMentor
      subMentorEmail: formData.subMentorEmail || null, // ✅ Giữ giá trị email mentor phụ
    };
  
    try {
      console.log("🚀 Gửi API cập nhật:", { topicId, semesterId, updatedData });
      await dispatch(updateTopic({ topicId, updatedData, semesterId })).unwrap();
      toast.success("✅ Cập nhật đề tài thành công!");
      navigate(`/lecturer/topic-detail/${topicId}/${semesterId}`);
      dispatch(fetchTopicDetail({ topicId, semesterId }));
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật đề tài.");
    }
  };
  

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
              <Input name="nameEn" value={formData.nameEn} onChange={handleChange} />
              <p className="text-sm text-gray-500 italic mb-1">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Abbreviations</p>
                <Input name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Vietnamese Title</p>
                <Input name="nameVi" value={formData.nameVi} onChange={handleChange} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Profession</p>
                <Input name="majorId" value={formData.majorId} onChange={handleChange} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <Badge>{formData.status}</Badge>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-1">Nhóm sinh viên</p>
                <Input
                  name="groupCode"
                  value={formData.groupCode}
                  onChange={handleChange}
                  placeholder="Chưa có nhóm tham gia dự án"
                />
              </div>

              {/* 🔹 Select Mentor Phụ */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor phụ</p>
                <Select value={formData.subMentorEmail} onValueChange={(email) => setFormData({ ...formData, subMentorEmail: email })}>
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
                      <SelectItem value="" disabled>Không có mentor khả dụng</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <Textarea name="description" className="w-full p-2 border rounded-md h-24" value={formData.description} onChange={handleChange} />
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
