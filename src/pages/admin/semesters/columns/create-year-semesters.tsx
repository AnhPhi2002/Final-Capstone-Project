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

export const CreateYearSemesters = () => {
  return (
    <div>
      <Dialog>
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
              Thêm thông tin chi tiết cho năm mới mới bên dưới. Nhấp vào lưu để
              xác nhận.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Năm học
              </Label>
              <Input
                id="year"
                placeholder="e.g., 2025"
                className="col-span-3"
              />
            </div>
   

          </div>
          <DialogFooter>
            <Button type="submit">Lưu năm học </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
