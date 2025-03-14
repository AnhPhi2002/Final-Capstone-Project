import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchSubmissionRounds } from "@/lib/api/redux/submissionRoundSlice";
import { createCouncil } from "@/lib/api/redux/councilSlice";

export const CreateReviewTopicCouncil = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy dữ liệu từ Redux
  const { data: years } = useSelector((state: RootState) => state.years);
  const { data: semesters } = useSelector((state: RootState) => state.semesters);
  const { data: submissionRounds } = useSelector((state: RootState) => state.submissionRounds);

  // State quản lý form
  const [open, setOpen] = useState(false);
  const [councilName, setCouncilName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubmissionRound, setSelectedSubmissionRound] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
    }
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchSubmissionRounds(selectedSemester));
    }
  }, [selectedSemester, dispatch]);

  // ✅ Chuyển đổi ngày sang định dạng ISO 8601
  const convertToISODate = (dateString: string, isEndDate = false) => {
    return isEndDate ? `${dateString}T23:59:59.999Z` : `${dateString}T00:00:00.000Z`;
  };

  const handleCreateCouncil = async () => {
    if (!councilName || !selectedSemester || !selectedSubmissionRound || !startDate || !endDate) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    setCreating(true);

    const newCouncil = {
      name: councilName,
      semesterId: selectedSemester,
      submissionPeriodId: selectedSubmissionRound,
      startDate: convertToISODate(startDate), // ✅ Chuyển ngày bắt đầu
      endDate: convertToISODate(endDate, true), // ✅ Chuyển ngày kết thúc
      status,
      type: "topic",
      round: submissionRounds.find((round) => round.id === selectedSubmissionRound)?.roundNumber || 1,
    };

    try {
      await dispatch(createCouncil(newCouncil)).unwrap();
      toast.success("Hội đồng xét duyệt đã được tạo thành công!");

      // Reset form
      setOpen(false);
      setCouncilName("");
      setSelectedYear("");
      setSelectedSemester("");
      setSelectedSubmissionRound("");
      setStartDate("");
      setEndDate("");
      setStatus("ACTIVE");
    } catch (error) {
      toast.error("Tạo hội đồng xét duyệt thất bại!");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-black text-white">Tạo hội đồng xét duyệt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tạo hội đồng xét duyệt</DialogTitle>
            <DialogDescription>Nhập thông tin hội đồng xét duyệt bên dưới.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nhập tên hội đồng */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tên hội đồng</Label>
              <Input value={councilName} onChange={(e) => setCouncilName(e.target.value)} placeholder="VD: Hội đồng xét duyệt 1" className="col-span-3" />
            </div>

            {/* Chọn năm học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Năm học</Label>
              <Select onValueChange={setSelectedYear} value={selectedYear}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn năm học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {years.map((year) => (
                      <SelectItem key={year.id} value={year.id}>{year.year}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn kỳ học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Kỳ học</Label>
              <Select onValueChange={setSelectedSemester} value={selectedSemester} disabled={!selectedYear}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn kỳ học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>{semester.code}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn đợt nộp */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Đợt nộp</Label>
              <Select onValueChange={setSelectedSubmissionRound} value={selectedSubmissionRound} disabled={!selectedSemester}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn đợt nộp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {submissionRounds.map((round) => (
                      <SelectItem key={round.id} value={round.id}>{round.description}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Nhập ngày bắt đầu */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ngày bắt đầu</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="col-span-3" />
            </div>

            {/* Nhập ngày kết thúc */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ngày kết thúc</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="col-span-3" />
            </div>

            {/* Chọn trạng thái */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Trạng thái</Label>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCreateCouncil} disabled={creating}>
              {creating ? "Đang tạo..." : "Lưu hội đồng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
