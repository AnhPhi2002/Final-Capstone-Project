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

type UpdateYearSemesterProps = {
  yearId: string;
  currentYear: number;
  onUpdateSuccess: (updatedYear: number, yearId: string) => void;
};

export const UpdateYearSemester: React.FC<UpdateYearSemesterProps> = ({
  yearId,
  currentYear,
  onUpdateSuccess,
}) => {
  const [year, setYear] = useState<number | "">(currentYear);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || isNaN(Number(year))) {
      alert("Vui lòng nhập một năm hợp lệ");
      return;
    }

    const result = await dispatch(updateYear({ yearId, year: Number(year) }));
    if (updateYear.fulfilled.match(result)) {
      const message = result.payload?.message || "Cập nhật thành công!";
      alert(message);
      onUpdateSuccess(Number(year), yearId); // Gọi hàm để cập nhật state cục bộ ở component cha
      setIsDialogOpen(false); // Đóng dialog sau khi cập nhật thành công
    } else {
      alert(result.payload || "Cập nhật thất bại");
    }
  };

  return (
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
  );
};
