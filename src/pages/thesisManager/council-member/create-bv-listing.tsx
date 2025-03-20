import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import councilData from "@/data/council-member.json"; 

export const CreateBvListing = () => {
  const [open, setOpen] = useState(false);
  const [yearId, setYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [bvType, setBvType] = useState("BV1");
  const [bvDate, setBvDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const years = [...new Set(councilData.map((semester) => semester.year))];

  const filteredSemesters =
    yearId === ""
      ? []
      : councilData.filter((semester) => semester.year === yearId);

  const handleSave = () => {
    if (!yearId || !semesterId || !bvType || !bvDate || !status) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newBvEntry = {
      yearId,
      semesterId,
      bvType,
      bvDate,
      status,
    };

    console.log("Bảo vệ đã được tạo:", newBvEntry);
    toast.success("Bảo vệ đã được tạo thành công!");
    setOpen(false);
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white">Tạo bảo vệ mới</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Tạo bảo vệ mới</DialogTitle>
            <DialogDescription>
              Chọn năm học, kỳ học, loại bảo vệ và nhập ngày. Nhấn "Lưu" để xác nhận.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Chọn năm học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">Năm học</Label>
              <Select onValueChange={setYearId} value={yearId}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn năm học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn kỳ học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">Kỳ học</Label>
              <Select onValueChange={setSemesterId} value={semesterId}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn kỳ học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filteredSemesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.code}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn loại bảo vệ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bvType" className="text-right">Loại bảo vệ</Label>
              <Select onValueChange={setBvType} value={bvType}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn loại bảo vệ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="BV1">Bảo vệ lần 1</SelectItem>
                    <SelectItem value="BV2">Bảo vệ lần 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Nhập ngày bảo vệ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bv_date" className="text-right">Ngày bảo vệ</Label>
              <Input
                id="bv_date"
                type="date"
                className="col-span-3"
                value={bvDate}
                onChange={(e) => setBvDate(e.target.value)}
              />
            </div>
              {/* Nhập ngày kết thúc bảo vệ */}
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bv_date" className="text-right">Ngày kết thúc</Label>
              <Input
                id="bv_date"
                type="date"
                className="col-span-3"
                value={bvDate}
                onChange={(e) => setBvDate(e.target.value)}
              />
            </div>


            {/* Trạng thái */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Trạng thái</Label>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="COMPLETE">Không hoạt động</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Lưu bảo vệ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
