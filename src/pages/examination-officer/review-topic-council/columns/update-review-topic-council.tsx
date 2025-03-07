import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Toaster, toast } from "sonner";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { updateCouncil } from "@/lib/api/redux/councilSlice";
import { Council } from "@/lib/api/types";
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
  name: z.string().min(3, "Tên hội đồng phải có ít nhất 3 ký tự"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  councilStartDate: z.string().min(10, "Ngày bắt đầu không hợp lệ"),
  councilEndDate: z.string().min(10, "Ngày kết thúc không hợp lệ"),
});

interface UpdateReviewTopicCouncilProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  council: Council;
  refetchData?: () => void;
}

export const UpdateReviewTopicCouncil: React.FC<UpdateReviewTopicCouncilProps> = ({
  open,
  setOpen,
  council,
  refetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: council.name || "",
      status: council.status || "INACTIVE",
      councilStartDate: council.councilStartDate ? new Date(council.councilStartDate).toISOString().split("T")[0] : "",
      councilEndDate: council.councilEndDate ? new Date(council.councilEndDate).toISOString().split("T")[0] : "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: council.name || "",
        status: council.status || "INACTIVE",
        councilStartDate: council.councilStartDate ? new Date(council.councilStartDate).toISOString().split("T")[0] : "",
        councilEndDate: council.councilEndDate ? new Date(council.councilEndDate).toISOString().split("T")[0] : "",
      });
    }
  }, [open, council, form]);

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      councilStartDate: new Date(data.councilStartDate).toISOString(), // Format ISO
      councilEndDate: new Date(data.councilEndDate).toISOString(),
    };

    try {
      await dispatch(updateCouncil({ councilId: council.id, updatedData: formattedData })).unwrap();
      toast.success("Cập nhật hội đồng thành công!");
      if (refetchData) refetchData();
      setOpen(false);
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Cập nhật hội đồng</h2>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-500 text-sm">Nhập thông tin hội đồng bên dưới. Nhấn "Lưu" để xác nhận.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Tên hội đồng */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên hội đồng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên hội đồng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trạng thái */}
            <FormField
              control={form.control}
              name="status"
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

            {/* Ngày bắt đầu */}
            <FormField
              control={form.control}
              name="councilStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ngày kết thúc */}
            <FormField
              control={form.control}
              name="councilEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="submit">Lưu cập nhật</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
