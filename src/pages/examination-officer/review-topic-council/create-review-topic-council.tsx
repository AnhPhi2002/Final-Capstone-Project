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

  const { data: years } = useSelector((state: RootState) => state.years);
  const { data: semesters } = useSelector((state: RootState) => state.semesters);
  const { data: submissionRounds } = useSelector((state: RootState) => state.submissionRounds);

  const [open, setOpen] = useState(false);
  const [councilName, setCouncilName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubmissionRound, setSelectedSubmissionRound] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status] = useState("ACTIVE");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) dispatch(fetchSemesters({ yearId: selectedYear }));
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester) dispatch(fetchSubmissionRounds(selectedSemester));
  }, [selectedSemester, dispatch]);

  const convertToISODate = (date: string, isEnd = false) =>
    isEnd ? `${date}T00:00:00.000Z` : `${date}T00:00:00.000Z`;

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

    const round = submissionRounds.find((r) => r.id === selectedSubmissionRound);
    if (!round) {
      toast.error("Không tìm thấy đợt nộp được chọn!");
      setCreating(false);
      return;
    }

    // Tìm submission có type "TOPIC", roundNumber khớp, và isDeleted là false
    const relatedSubmission = submissionRounds.find(
      (r) => r.type === "TOPIC" && r.roundNumber === round.roundNumber && r.isDeleted === false
    );

    if (!relatedSubmission) {
      toast.error("Không tìm thấy đợt nộp TOPIC hợp lệ");
      setCreating(false);
      return;
    }

    const newCouncil = {
      name: councilName,
      semesterId: selectedSemester,
      submissionPeriodId: selectedSubmissionRound,
      relatedSubmissionPeriodId: relatedSubmission.id,
      startDate: convertToISODate(startDate),
      endDate: convertToISODate(endDate, true),
      status,
      type: "CHECK-TOPIC",
      round: round.roundNumber || 1,
    };

    try {
      await dispatch(createCouncil(newCouncil)).unwrap();
      toast.success("Tạo hội đồng xét duyệt thành công!");
      setOpen(false);
      setCouncilName("");
      setSelectedYear("");
      setSelectedSemester("");
      setSelectedSubmissionRound("");
      setStartDate("");
      setEndDate("");
    } catch {
      toast.error("Tạo hội đồng xét duyệt thất bại!");
    } finally {
      setCreating(false);
    }
  };

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted);
  const availableRounds = submissionRounds.filter((r) => !r.isDeleted);

  // Lọc submission rounds để chỉ lấy type "CHECK-TOPIC"
  const filteredRounds = availableRounds.filter((r) => r.type === "CHECK-TOPIC");

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
            <DialogDescription>Nhập thông tin hội đồng bên dưới.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tên hội đồng</Label>
              <Input
                value={councilName}
                onChange={(e) => setCouncilName(e.target.value)}
                placeholder="VD: Hội đồng xét duyệt 1"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Năm học</Label>
              <Select onValueChange={setSelectedYear} value={selectedYear}>
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn năm học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableYears.map((year) => (
                      <SelectItem key={year.id} value={year.id}>
                        {year.year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Kỳ học</Label>
              <Select
                onValueChange={setSelectedSemester}
                value={selectedSemester}
                disabled={!selectedYear}
              >
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn kỳ học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableSemesters.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.code}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Đợt nộp</Label>
              <Select
                onValueChange={setSelectedSubmissionRound}
                value={selectedSubmissionRound}
                disabled={!selectedSemester}
              >
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Chọn đợt nộp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filteredRounds.length > 0 ? (
                      filteredRounds.map((round) => (
                        <SelectItem key={round.id} value={round.id}>
                          {round.description}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        Không có đợt nộp CHECK-TOPIC
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ngày bắt đầu</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ngày kết thúc</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="col-span-3"
              />
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