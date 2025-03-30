import { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchAllYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters } from "@/lib/api/redux/semesterSlice";
import { createSubmissionRound } from "@/lib/api/redux/submissionRoundSlice";
import { Toaster, toast } from "sonner";

export const CreateSubmissionRound = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading: yearLoading } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: semesterLoading } = useSelector((state: RootState) => state.semesters);

  const [open, setOpen] = useState(false);
  const [yearId, setYearId] = useState("");
  const [type, setType] = useState<"TOPIC" | "CHECK-TOPIC" | "REVIEW" | "DEFENSE" | "">("");
  const [semesterId, setSemesterId] = useState("");
  const [roundNumber, setRoundNumber] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creating, setCreating] = useState(false);

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted);
  const sortedSemesters = availableSemesters.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (yearId) {
      dispatch(fetchSemesters({ yearId }));
    }
  }, [yearId, dispatch]);

  const convertToISODate = (dateString: string, isEnd = false) => {
    return isEnd ? `${dateString}T23:59:59.999Z` : `${dateString}T00:00:00.000Z`;
  };

  const handleSave = async () => {
    if (!semesterId || !roundNumber || !startDate || !endDate || !description || !type) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const parsedRound = Number(roundNumber);
    if (isNaN(parsedRound) || parsedRound <= 0) {
      toast.error("Lần nộp phải là số hợp lệ lớn hơn 0!");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    setCreating(true);
    try {
      const result = await dispatch(
        createSubmissionRound({
          semesterId,
          type,
          roundNumber: parsedRound,
          startDate: convertToISODate(startDate),
          endDate: convertToISODate(endDate, true),
          description,
        })
      ).unwrap();

      if (result?.success) {
        toast.success("Tạo vòng nộp thành công!");
        setOpen(false);
      } else {
        throw new Error(result?.message || "Tạo thất bại!");
      }
    } catch (error: any) {
      toast.error(`Tạo thất bại: ${error}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white">Tạo vòng nộp mới</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tạo vòng nộp mới</DialogTitle>
            <DialogDescription>
              Chọn năm học, kỳ học và nhập thông tin vòng nộp bên dưới. Nhấn "Lưu" để xác nhận.
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
                    {yearLoading ? (
                      <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                    ) : availableYears.map((year) => (
                      <SelectItem key={year.id} value={year.id}>{year.year}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn kỳ học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">Kỳ học</Label>
              <Select onValueChange={setSemesterId} value={semesterId} disabled={!yearId}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn kỳ học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {semesterLoading ? (
                      <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                    ) : sortedSemesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>{semester.code}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn loại */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Loại</Label>
              <Select onValueChange={(value: "TOPIC" | "CHECK-TOPIC" | "REVIEW" | "DEFENSE") => {
                setType(value);
                setRoundNumber(""); // Reset roundNumber khi thay đổi type
              }} value={type}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="TOPIC">TOPIC</SelectItem>
                    <SelectItem value="CHECK-TOPIC">CHECK-TOPIC</SelectItem>
                    <SelectItem value="REVIEW">REVIEW</SelectItem>
                    <SelectItem value="DEFENSE">DEFENSE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Lần nộp */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roundNumber" className="text-right">Lần nộp</Label>
              <Select onValueChange={setRoundNumber} value={roundNumber} disabled={!type}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn lần nộp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {type === "DEFENSE" ? (
                      <>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Mô tả */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Mô tả</Label>
              <Input
                id="description"
                placeholder="VD: Đợt đăng ký lần 2"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Ngày bắt đầu */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">Ngày bắt đầu</Label>
              <Input
                id="startDate"
                type="date"
                className="col-span-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Ngày kết thúc */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">Ngày kết thúc</Label>
              <Input
                id="endDate"
                type="date"
                className="col-span-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave} disabled={creating}>
              {creating ? "Đang tạo..." : "Lưu vòng nộp"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};