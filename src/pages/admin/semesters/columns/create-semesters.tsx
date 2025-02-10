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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import semesterData from "@/data/semester.json"; // Import dữ liệu năm học

export const CreateSemesters = () => {
  const [year, setYear] = useState("");
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");

  // Lấy danh sách năm học duy nhất từ `semesterData`
  const years = [...new Set(semesterData.map((item) => item.year))];

  const handleSave = () => {
    if (!year || !code || !startDate || !endDate || !status) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    console.log("Saving Semester:", { year, code, startDate, endDate, status });

    // Gọi API nếu cần
    // fetch("/api/semesters", { method: "POST", body: JSON.stringify({ year, code, startDate, endDate, status }) });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-black text-white hover:bg-gray-800">
            Tạo học kỳ mới
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tạo học kỳ mới</DialogTitle>
            <DialogDescription>
              Chọn năm học và nhập thông tin học kỳ bên dưới. Nhấn "Lưu" để xác nhận.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Chọn năm học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Năm học
              </Label>
              <Select onValueChange={(value) => setYear(value)}>
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

            {/* Nhập mã học kỳ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Mã học kỳ
              </Label>
              <Input
                id="code"
                placeholder="VD: Spring2025"
                className="col-span-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {/* Ngày bắt đầu */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date" className="text-right">
                Ngày bắt đầu
              </Label>
              <Input
                id="start_date"
                type="date"
                className="col-span-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Ngày kết thúc */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date" className="text-right">
                Ngày kết thúc
              </Label>
              <Input
                id="end_date"
                type="date"
                className="col-span-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Trạng thái */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Trạng thái
              </Label>
              <Select onValueChange={(value) => setStatus(value)} defaultValue="Active">
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Lưu học kỳ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
