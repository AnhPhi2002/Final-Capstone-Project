// components/UpdateReviewTopicCouncil.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { updateCouncil } from "@/lib/api/redux/councilReviewSlice"; // Sửa import
import { Council } from "@/lib/api/types";

const formSchema = z.object({
  name: z.string().min(3, "Tên hội đồng phải có ít nhất 3 ký tự"),
  semesterId: z.string().min(1, "Học kỳ ID là bắt buộc"),
  submissionPeriodId: z.string().min(1, "Submission Period ID là bắt buộc"),
  startDate: z.string().min(10, "Ngày bắt đầu không hợp lệ"),
  endDate: z.string().min(10, "Ngày kết thúc không hợp lệ"),
  round: z.number().min(1, "Vòng phải lớn hơn hoặc bằng 1"),
});

interface UpdateReviewTopicCouncilProps {
  open: boolean;
  setOpen: () => void;
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
      semesterId: council.semesterId || "",
      submissionPeriodId: council.submissionPeriodId || "",
      startDate: council.councilStartDate
        ? new Date(council.councilStartDate).toISOString().split("T")[0]
        : "",
      endDate: council.councilEndDate
        ? new Date(council.councilEndDate).toISOString().split("T")[0]
        : "",
      round: council.round || 1,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: council.name || "",
        semesterId: council.semesterId || "",
        submissionPeriodId: council.submissionPeriodId || "",
        startDate: council.councilStartDate
          ? new Date(council.councilStartDate).toISOString().split("T")[0]
          : "",
        endDate: council.councilEndDate
          ? new Date(council.councilEndDate).toISOString().split("T")[0]
          : "",
        round: council.round || 1,
      });
    }
  }, [open, council, form]);

  const onSubmit = async (data: any) => {
    console.log("Submitting data:", data);
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const formattedData = {
      name: data.name,
      semesterId: data.semesterId,
      submissionPeriodId: data.submissionPeriodId,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      round: data.round,
    };

    setIsLoading(true);
    try {
      await dispatch(updateCouncil({ councilId: council.id, updatedData: formattedData })).unwrap();
      toast.success("Cập nhật hội đồng thành công!");
      refetchData?.();
      setOpen();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Cập nhật thất bại!");
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
            onClick={setOpen}
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

          <div>
            <label className="block text-sm font-medium mb-1">Học kỳ ID</label>
            <input
              type="text"
              {...form.register("semesterId")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.semesterId && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.semesterId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Submission Period ID</label>
            <input
              type="text"
              {...form.register("submissionPeriodId")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.submissionPeriodId && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.submissionPeriodId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
            <input
              type="date"
              {...form.register("startDate")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
            <input
              type="date"
              {...form.register("endDate")}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.endDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Vòng</label>
            <input
              type="number"
              {...form.register("round", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-lg p-2"
              disabled={isLoading}
            />
            {form.formState.errors.round && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.round.message}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={setOpen}
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