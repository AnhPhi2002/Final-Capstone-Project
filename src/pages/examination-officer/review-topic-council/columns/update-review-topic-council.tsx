import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { updateCouncil } from "@/lib/api/redux/councilSlice";
import { Council } from "@/lib/api/types";

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
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: council.name || "",
      status: council.status || "INACTIVE",
      councilStartDate: council.councilStartDate
        ? new Date(council.councilStartDate).toISOString().split("T")[0]
        : "",
      councilEndDate: council.councilEndDate
        ? new Date(council.councilEndDate).toISOString().split("T")[0]
        : "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: council.name || "",
        status: council.status || "INACTIVE",
        councilStartDate: council.councilStartDate
          ? new Date(council.councilStartDate).toISOString().split("T")[0]
          : "",
        councilEndDate: council.councilEndDate
          ? new Date(council.councilEndDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [open, council, form]);

  const onSubmit = async (data: any) => {
    console.log("Submitting data:", data); // Debug
    if (new Date(data.councilEndDate) <= new Date(data.councilStartDate)) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const formattedData = {
      ...data,
      councilStartDate: new Date(data.councilStartDate).toISOString(),
      councilEndDate: new Date(data.councilEndDate).toISOString(),
    };

    setIsLoading(true);
    try {
      await dispatch(updateCouncil({ councilId: council.id, updatedData: formattedData })).unwrap();
      toast.success("Cập nhật hội đồng thành công!");
      if (refetchData) {
        console.log("Triggering refetch"); // Debug
        refetchData(); // Gọi refetch một lần
      }
      setOpen(false);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Cập nhật hội đồng</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800"
            disabled={isLoading}
          >
            ✖
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Nhập thông tin hội đồng bên dưới. Nhấn "Lưu" để xác nhận.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên hội đồng</label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              {...form.register("status")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            >
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
            <input
              type="date"
              {...form.register("councilStartDate")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.councilStartDate && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.councilStartDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
            <input
              type="date"
              {...form.register("councilEndDate")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.councilEndDate && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.councilEndDate.message}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Đang lưu..." : "Lưu cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};