import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { createSemester, fetchSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchAllYears } from "@/lib/api/redux/yearSlice";
import { Toaster, toast } from "sonner";

export const CreateSemesters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading: yearLoading } = useSelector(
    (state: RootState) => state.years
  );

  const [open, setOpen] = useState(false);
  const [yearId, setYearId] = useState("");
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  const handleSave = async () => {
    if (!yearId || !code || !startDate || !endDate || !registrationDeadline || !status) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const newSemester = {
      yearId,
      code,
      startDate,
      endDate,
      registrationDeadline,
      status,
    };

    try {
      await dispatch(createSemester(newSemester)).unwrap();
      toast.success("Học kỳ đã được tạo thành công!");
      setOpen(false);
      dispatch(fetchSemesters({ yearId }));
    } catch (error: any) {
      console.error("Failed to create semester:", error);
      toast.error("Có lỗi xảy ra khi tạo học kỳ!");
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white hover:bg-gray-800">Tạo học kỳ mới</Button>
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
              <Label htmlFor="year" className="text-right">Năm học</Label>
              <Select onValueChange={(value) => setYearId(value)}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn năm học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {yearLoading ? (
                      <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                    ) : (
                      years.map((year) => (
                        <SelectItem key={year.id} value={year.id}>
                          {year.year}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Nhập mã học kỳ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">Mã học kỳ</Label>
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
              <Label htmlFor="start_date" className="text-right">Ngày bắt đầu</Label>
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
              <Label htmlFor="end_date" className="text-right">Ngày kết thúc</Label>
              <Input
                id="end_date"
                type="date"
                className="col-span-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Hạn đăng ký */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registration_deadline" className="text-right">Hạn đăng ký</Label>
              <Input
                id="registration_deadline"
                type="date"
                className="col-span-3"
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
              />
            </div>

            {/* Trạng thái */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Trạng thái</Label>
              <Select onValueChange={(value) => setStatus(value)} defaultValue="ACTIVE">
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="COMPLETE">COMPLETE</SelectItem>
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
