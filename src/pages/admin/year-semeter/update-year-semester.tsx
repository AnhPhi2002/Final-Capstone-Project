import React, { useEffect } from "react";
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


type FormData = {
  year: number;
};

type UpdateYearSemesterProps = {
  yearId: number; 
};

export const UpdateYearSemester: React.FC<UpdateYearSemesterProps> = () => {

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Cập nhật</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật năm học</DialogTitle>
            <DialogDescription>
              Sửa đổi thông tin chi tiết cho năm học bên dưới. Nhấp vào lưu để xác nhận.
            </DialogDescription>
          </DialogHeader>
          <form >
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
                />
              </div>

            </div>
            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
