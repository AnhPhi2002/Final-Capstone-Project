import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { updateMeetingStatus } from "@/lib/api/redux/scheduleSlice";
import { fetchCouncilDefenseDetailForMentor } from "@/lib/api/redux/councilDefenseSlice"; // Import action
import { toast } from "sonner";

type MeetingStatusModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  schedule: DefenseSchedule;
  semesterId: string;
  councilId?: string;
};

export const MeetingStatusModal: React.FC<MeetingStatusModalProps> = ({
  open,
  setOpen,
  schedule,
  semesterId,
//   councilId
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<"PENDING" | "ACTIVE" | "COMPLETE" | "CANCELED">("COMPLETE");
  const [notes, setNotes] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateStatus = async () => {
    if (!schedule?.id) {
      toast.error("Không tìm thấy ID lịch bảo vệ!");
      return;
    }

    setIsProcessing(true);
    try {
      await dispatch(
        updateMeetingStatus({
          scheduleId: schedule.id,
          semesterId,
          status,
          notes,
        })
      ).unwrap();

      // Gọi lại API để refresh dữ liệu councilDetail
      if (schedule.councilId) {
        await dispatch(
          fetchCouncilDefenseDetailForMentor({
            councilId: schedule.councilId,
            semesterId,
          })
        ).unwrap();
      }

      toast.success("Cập nhật trạng thái phòng họp thành công!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi cập nhật trạng thái!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái phòng họp</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Trạng thái</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="w-full p-2 border rounded"
              disabled={isProcessing}
            >
              <option value="PENDING">PENDING</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="CANCELED">CANCELED</option>
            </select>
          </div>
          <div>
            <Label>Ghi chú (không bắt buộc)</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập ghi chú nếu cần..."
              disabled={isProcessing}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button onClick={handleUpdateStatus} disabled={isProcessing}>
            {isProcessing ? "Đang xử lý..." : "Cập nhật"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};