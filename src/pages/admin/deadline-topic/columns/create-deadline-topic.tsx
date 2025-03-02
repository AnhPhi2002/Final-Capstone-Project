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
  // import { createDeadlineTopic, fetchDeadlineTopics } from "@/lib/api/redux/deadlineTopicSlice";
  import { fetchAllYears } from "@/lib/api/redux/yearSlice";
  import { Toaster, toast } from "sonner";

  export const CreateDeadlineTopic = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: years, loading: yearLoading } = useSelector(
      (state: RootState) => state.years
    );

    const [open, setOpen] = useState(false);
    const [yearId, setYearId] = useState("");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("ACTIVE");

    useEffect(() => {
      dispatch(fetchAllYears());
    }, [dispatch]);

    const handleSave = async () => {
      if (!yearId || !name || !startDate || !endDate || !status) {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end <= start) {
        toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
        return;
      }

      const newDeadlineTopic = {
        yearId,
        name,
        startDate,
        endDate,
        status,
      };

      // try {
      //   await dispatch(createDeadlineTopic(newDeadlineTopic)).unwrap();
      //   toast.success("Đợt nộp đề tài đã được tạo thành công!");
      //   setOpen(false);
      //   dispatch(fetchDeadlineTopics({ yearId }));
      // } catch (error: any) {
      //   console.error("Failed to create deadline topic:", error);
      //   toast.error("Có lỗi xảy ra khi tạo đợt nộp đề tài!");
      // }
    };

    return (
      <div>
        <Toaster position="top-right" richColors duration={3000} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white ">Tạo đợt nộp đề tài</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tạo đợt nộp đề tài</DialogTitle>
              <DialogDescription>
                Chọn năm học và nhập thông tin đợt nộp bên dưới. Nhấn "Lưu" để xác nhận.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
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

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Tên đợt nộp</Label>
                <Input
                  id="name"
                  placeholder="VD: Đợt nộp luận văn"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Trạng thái</Label>
                <Select onValueChange={(value) => setStatus(value)} defaultValue="ACTIVE">
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ACTIVE">Hoạt động </SelectItem>
                      <SelectItem value="COMPLETE">Không hoạt động </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSave}>Lưu đợt nộp</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
