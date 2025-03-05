import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "sonner";
import { X } from "lucide-react";
import { Lecturer } from "@/types/Lecturer";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Schema validation với Zod
const formSchema = z.object({
  fullName: z.string().min(3, "Tên giảng viên phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  lecturerCode: z.string().min(2, "Mã giảng viên không được để trống"),
  isActive: z.enum(["ACTIVE", "INACTIVE"]),
});

interface UpdateReviewTopicCouncilProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  lecturer: Lecturer;
  refetchData?: () => void;
}

export const UpdateReviewTopicCouncil: React.FC<UpdateReviewTopicCouncilProps> = ({
  open,
  setOpen,
  lecturer,
  refetchData,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: lecturer.fullName || "",
      email: lecturer.email || "",
      lecturerCode: lecturer.lecturerCode || "",
      isActive: lecturer.isActive ? "ACTIVE" : "INACTIVE",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        fullName: lecturer.fullName || "",
        email: lecturer.email || "",
        lecturerCode: lecturer.lecturerCode || "",
        isActive: lecturer.isActive ? "ACTIVE" : "INACTIVE",
      });
    }
  }, [open, lecturer, form]);

  const onSubmit = (data: any) => {
    console.log("Dữ liệu giảng viên cập nhật:", data);
    toast.success("Cập nhật giảng viên thành công!");
    if (refetchData) refetchData();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        {/* ✅ Header có thêm Description */}
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Cập nhật giảng viên</h2>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Nhập thông tin giảng viên bên dưới. Nhấn "Lưu" để xác nhận.
          </p>
        </div>

        {/* ✅ Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Tên giảng viên */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên giảng viên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên giảng viên" {...field} />
                  </FormControl>
           
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Nhập email" {...field} />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mã giảng viên */}
            <FormField
              control={form.control}
              name="lecturerCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã giảng viên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mã giảng viên" {...field} />
                  </FormControl>
              
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trạng thái */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                      <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
               
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Footer */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">Lưu cập nhật</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
