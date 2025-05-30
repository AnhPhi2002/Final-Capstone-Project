"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchUserProfile, updateUserProfile } from "@/lib/api/redux/authSlice";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { axiosClient } from "@/lib/api/config/axios-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";

const formSchema = z.object({
  username: z.string().min(1, "Họ và tên không được để trống"),
  gender: z.string().optional(),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại tối đa 15 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số")
    .optional()
    .or(z.literal("")), // Cho phép để trống hoàn toàn
  personal_Email: z.string().email("Email không hợp lệ"),
  profession: z.string().optional(),
  specialty: z.string().optional(),
  programming_language: z
    .string()
    .max(255, "Kỹ năng không được vượt quá 255 ký tự")
    .optional()
    .or(z.literal("")), // Cho phép để trống hoàn toàn
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
});


type FormData = z.infer<typeof formSchema>;

export default function ProfileUpdateForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      gender: "",
      phone: "",
      personal_Email: "",
      profession: "",
      specialty: "",
      programming_language: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || "",
        gender: user.gender || "",
        phone: user.phone || "",
        personal_Email: user.personal_Email || user.email,
        profession: user.profession || "",
        specialty: user.specialty || "",
        programming_language: user.programming_language || "",
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [user, form]);

  const rolePathMap: Record<string, string> = {
    admin: "admin",
    lecturer: "lecturer",
    student: "student",
    academic_officer: "academic",
    examination_officer: "examination",
    graduation_thesis_manager: "graduation-thesis",
  };
  const path = rolePathMap[currentRole || ""] || "";

  const onSubmit = async (values: FormData) => {
    try {
      if (values.oldPassword && values.newPassword) {
        await axiosClient.put("/users/change-password", {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        toast.success("Đổi mật khẩu thành công!");
      }

      await dispatch(updateUserProfile(values)).unwrap();
      toast.success("Cập nhật thông tin thành công!");
      navigate(`/${path}/profile-page`);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        (typeof error === "string" ? error : "Đã xảy ra lỗi");
      toast.error(msg);
    }
  };

  return (
    <div>
      <Header title="Profile" href="/" currentPage="Cập nhật thông tin cá nhân" />
      <div className="container mx-auto p-6 mt-10">
        <Card className="p-6">
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="personal_Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại liên hệ</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu hiện tại</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu mới</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới tính</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Chọn giới tính" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Nam</SelectItem>
                            <SelectItem value="Female">Nữ</SelectItem>
                            <SelectItem value="Other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chuyên ngành hẹp</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngành</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="programming_language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kỹ năng</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Đang cập nhật..." : "Cập Nhật"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
