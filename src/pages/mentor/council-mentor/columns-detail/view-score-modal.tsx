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
import { CouncilReviewSessions } from "@/lib/api/types";

type ViewScoreModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: CouncilReviewSessions;
};

export const ViewScoreModal: React.FC<ViewScoreModalProps> = ({
  open,
  setOpen,
  session,
}) => {
  // Giả sử lấy assignment đầu tiên trong mảng assignments
  const assignment = session.assignments && session.assignments.length > 0 ? session.assignments[0] : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin điểm của nhóm {session.group?.groupCode}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Mã nhóm</Label>
            <p className="text-sm text-gray-700">{session.group?.groupCode || "N/A"}</p>
          </div>
          <div>
            <Label>Tên đề tài</Label>
            <p className="text-sm text-gray-700">{session.topic?.name || "N/A"}</p>
          </div>
          <div>
            <Label>Điểm</Label>
            <p className="text-sm text-gray-700">{assignment?.score ?? "Chưa chấm"}</p>
          </div>
          <div>
            <Label>Người chấm</Label>
            <p className="text-sm text-gray-700">{assignment?.reviewer?.fullName || "N/A"}</p>
          </div>
          <div>
            <Label>Nhận xét</Label>
            <p className="text-sm text-gray-700">{assignment?.feedback || "Chưa có nhận xét"}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};