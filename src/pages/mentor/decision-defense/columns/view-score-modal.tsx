import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ReviewSchedule } from "@/lib/api/types";

export type ViewScoreModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  schedule: ReviewSchedule;
};

export const ViewScoreModal: React.FC<ViewScoreModalProps> = ({
  open,
  setOpen,
  schedule,
}) => {
  const assignment = schedule.assignments?.[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            Thông tin điểm của nhóm {schedule.schedule.group.groupCode}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Mã nhóm</Label>
            <p className="text-sm text-gray-700">
              {schedule.schedule.group.groupCode || "N/A"}
            </p>
          </div>
          <div>
            <Label>Tên đề tài</Label>
            <p className="text-sm text-gray-700">
              {schedule.schedule.topic.topicCode || "N/A"}
            </p>
          </div>
          <div>
            <Label>Điểm</Label>
            <p className="text-sm text-gray-700">
              {assignment?.score ?? "Chưa chấm"}
            </p>
          </div>
          <div>
            <Label>Người chấm</Label>
            <p className="text-sm text-gray-700">
              {assignment?.reviewer?.fullName || "N/A"}
            </p>
          </div>
          <div>
            <Label>Nhận xét</Label>
            <p className="text-sm text-gray-700">
              {assignment?.feedback || "Chưa có nhận xét"}
            </p>
          </div>
        </div>

        <DialogFooter>
          {/* Đây là điểm quan trọng nhất để sửa lỗi bị đơ màn hình */}
          <Button variant="outline" onClick={() => setOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
