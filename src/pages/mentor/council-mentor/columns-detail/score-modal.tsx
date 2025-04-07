// src/components/score-modal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CouncilReviewSessions } from "@/lib/api/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { updateReviewAssignmentScore } from "@/lib/api/redux/councilReviewSlice";
import { useParams } from "react-router";
import { toast } from "sonner";

type ScoreModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: CouncilReviewSessions;
  refetchData?: () => void; // Thêm prop refetchData
};

export const ScoreModal: React.FC<ScoreModalProps> = ({
  open,
  setOpen,
  session,
  refetchData,
}) => {
  const [score, setScore] = useState<number | string>("");
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loadingScore, errorScore } = useSelector((state: RootState) => state.councilReview);
  const { semesterId } = useParams<{ semesterId?: string }>();

  const handleSubmit = async () => {
    if (!session.assignments || session.assignments.length === 0) {
      toast.error("Không có assignment để chấm điểm!");
      return;
    }

    if (!semesterId) {
      toast.error("Không tìm thấy semesterId!");
      return;
    }

    const assignmentId = session.assignments[0].id;
    const scoreData = {
      score: Number(score),
      feedback,
      status: "COMPLETED",
    };

    try {
      await dispatch(updateReviewAssignmentScore({ assignmentId, semesterId, scoreData })).unwrap();
      toast.success("Chấm điểm thành công!");
      setScore("");
      setFeedback("");
      setOpen(false);

      // Gọi refetchData để làm mới dữ liệu
      if (refetchData) {
        refetchData();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi chấm điểm: " + (errorScore || "Lỗi không xác định"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chấm điểm cho nhóm {session.group?.groupCode}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Mã nhóm</Label>
            <Input value={session.group?.groupCode || "N/A"} disabled />
          </div>
          <div>
            <Label>Tên đề tài</Label>
            <Input value={session.topic?.name || "N/A"} disabled />
          </div>
          <div>
            <Label>Điểm (0-10)</Label>
            <Input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min={0}
              max={10}
              step={0.1}
            />
          </div>
          <div>
            <Label>Nhận xét</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Nhập nhận xét..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loadingScore}>
            {loadingScore ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};