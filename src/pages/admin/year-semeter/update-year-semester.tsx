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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { updateYear } from "@/lib/api/redux/yearSlice";
import { Toaster, toast } from "sonner";

type UpdateYearSemesterProps = {
  yearId: string;
  currentYear: number;
  existingYears: number[];
  onUpdateSuccess: (updatedYear: number, yearId: string) => void;
};

export const UpdateYearSemester: React.FC<UpdateYearSemesterProps> = ({
  yearId,
  currentYear,
  existingYears,
  onUpdateSuccess,
}) => {
  const [year, setYear] = useState<number | "">(currentYear);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || isNaN(Number(year))) {
      toast.error("Vui lòng nhập một năm hợp lệ.");
      return;
    }

    if (existingYears.includes(Number(year))) {
      toast.error("Năm học đã tồn tại! Vui lòng nhập một năm khác.");
      return;
    }

    try {
      await dispatch(updateYear({ yearId, year: Number(year) })).unwrap();
      toast.success("Cập nhật năm học thành công!");
      onUpdateSuccess(Number(year), yearId);
      setIsDialogOpen(false);
    } catch (error) {
      const errorMessage =
        (error as { message: string }).message || "Cập nhật thất bại. Vui lòng thử lại!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Cập nhật</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật năm học</DialogTitle>
            <DialogDescription>Sửa đổi thông tin chi tiết cho năm học.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Năm học
                </Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g., 2025"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
