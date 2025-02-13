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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { createYear, fetchYears } from "@/lib/api/redux/yearSlice";
import { toast } from "react-toastify";

type FormData = {
  year: number;
};

export const CreateYearSemesters: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);  // State to manage dialog visibility

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(createYear({ year: data.year })).unwrap();
      toast.success("Tạo năm học thành công!");
      dispatch(fetchYears());
      reset();
      setOpen(false);  // Close the dialog on success
    } catch (error: any) {
      console.error("Error creating year:", error);
      toast.error(error.message || "Có lỗi xảy ra khi tạo năm học!");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800 hover:text-white focus:ring focus:ring-gray-500 focus:outline-none"
          >
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
