import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createYear, fetchYears } from "@/lib/api/redux/yearSlice";
import { toast } from "sonner";

type FormData = {
  year: number;
};

export const CreateYearSemesters: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const years = useSelector((state: RootState) => state.years.data);

  const onSubmit = async (data: FormData) => {
    // Kiểm tra trùng lặp chỉ với các năm có isDeleted: false
    if (years.some((year) => year.year === data.year && !year.isDeleted)) {
      toast.error("Năm học đã tồn tại và chưa bị xóa!");
      return;
    }

    try {
      await dispatch(createYear({ year: data.year })).unwrap();
      toast.success("Tạo năm học thành công!");
      dispatch(fetchYears());
      reset();
      setOpen(false);
    } catch (error: any) {
      const message = error?.message || "Có lỗi xảy ra khi tạo năm học!";
      if (message.includes("đã tồn tại")) {
        toast.error("Năm học đã tồn tại!");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white">
            Tạo năm học
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tạo năm học mới</DialogTitle>
            <DialogDescription>
              Thêm thông tin chi tiết cho năm học mới bên dưới. Nhấp vào lưu để xác nhận.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Năm học
                </Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g., 2025"
                  className="col-span-3"
                  {...register("year", {
                    required: "Vui lòng nhập năm học",
                    valueAsNumber: true,
                    validate: (value) => value > 0 || "Năm học phải là số lớn hơn 0",
                  })}
                />
              </div>
              {errors.year && (
                <p className="text-red-500 text-sm col-span-3">{errors.year.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Lưu năm học</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};