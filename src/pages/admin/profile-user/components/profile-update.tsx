"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchUserProfile, updateUserProfile } from "@/lib/api/redux/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function ProfileUpdateForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);
  const navigate = useNavigate();

  // State lưu thông tin profile
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "",
    gender: "",
    phone: "",
    personal_Email: "",
    profession: "",
    specialty: "",
    programming_language: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Khi user có dữ liệu thì fill vào form
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        avatar: user.avatar || "",
        gender: user.gender || "",
        phone: user.phone || "",
        personal_Email: user.personal_Email || "",
        profession: user.profession || "",
        specialty: user.specialty || "",
        programming_language: user.programming_language || "",
      });
    }
  }, [user]);

  // Xử lý nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  const rolePathMap: Record<string, string> = {
    admin: "admin",
    lecturer: "lecturer",
    student: "student",
    academic_officer: "academic",
    examination_officer: "examination",
    graduation_thesis_manager: "graduation-thesis",
  };
  const path = rolePathMap[currentRole || ""] || "";  
  // Gửi dữ liệu cập nhật lên API và hiển thị toast
  const handleSubmit = async () => {
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Cập nhật thông tin thành công! 🎉");
      navigate(`/${path}/profile-page`);
    } catch (error: any) {
      let errorMessage = "Cập nhật thất bại, vui lòng thử lại!";
  
      if (typeof error === "string") {
        errorMessage = error; // Nếu API trả về string lỗi
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message: string }).message; // Nếu error có field message
      } else {
        errorMessage = JSON.stringify(error); // Nếu error là object khác
      }
  
      toast.error(errorMessage);
    }
  };
  

  return (
    <div>
      <Header title="Profile" href="/" currentPage="Cập nhật thông tin cá nhân" />
      <div className="container mx-auto p-6 mt-10">
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 ">
                <div>
                  <Label>Email</Label>
                  <Input name="personal_Email" value={formData.personal_Email} onChange={handleChange} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <Label>Avatar URL</Label>
                  <Input name="avatar" value={formData.avatar} onChange={handleChange} placeholder="https://example.com/avatar.jpg" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input name="fullName" value={formData.fullName} onChange={handleChange} />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Profession</Label>
                  <Input name="profession" value={formData.profession} onChange={handleChange} />
                </div>
                <div>
                  <Label>Specialty</Label>
                  <Input name="specialty" value={formData.specialty} onChange={handleChange} />
                </div>
                <div>
                  <Label>Programming Languages</Label>
                  <Input name="programming_language" value={formData.programming_language} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập Nhật"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
