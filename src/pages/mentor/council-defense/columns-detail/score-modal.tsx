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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { evaluateStudentDefense
 } from "@/lib/api/redux/councilDefenseSlice";
import { toast } from "sonner";

type ScoreModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: DefenseSchedule;
  semesterId: string;
};

export const ScoreModal: React.FC<ScoreModalProps> = ({ open, setOpen, session, semesterId }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [result, setResult] = useState<"PASS" | "NOT_PASS" | "">("");
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loadingScore, errorScore } = useSelector((state: RootState) => state.councilDefense);

  // Tạo map để lấy email từ group.members dựa trên studentId
  const studentEmailMap = new Map(
    session.group.members.map(member => [member.studentId, member.student.user.email])
  );

  const handleSubmit = async () => {
    if (!selectedStudentId) {
      toast.error("Vui lòng chọn sinh viên!");
      return;
    }
    if (!result) {
      toast.error("Vui lòng chọn kết quả!");
      return;
    }

    try {
      await dispatch(
        evaluateStudentDefense({
          scheduleId: session.id,
          studentId: selectedStudentId,
          semesterId,
          result,
          feedback,
        })
      ).unwrap();
      toast.success("Chấm điểm thành công!");
      setSelectedStudentId("");
      setResult("");
      setFeedback("");
      setOpen(false);
    } catch (error) {
      toast.error(errorScore || "Lỗi khi chấm điểm!");
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
            <Input
              value={session.group.topicAssignments[0]?.topic.name || "N/A"}
              disabled
            />
          </div>
          <div>
            <Label>Chọn sinh viên</Label>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn sinh viên" />
              </SelectTrigger>
              <SelectContent>
                {session.memberResults.map((result) => {
                  const student = result.student;
                  const email = studentEmailMap.get(result.studentId) ?? "Chưa có email";

                  return (
                    <SelectItem key={result.studentId} value={result.studentId}>
                      {student.studentCode} - {email}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kết quả</Label>
            <Select value={result} onValueChange={(value: "PASS" | "NOT_PASS") => setResult(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn kết quả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PASS">PASS</SelectItem>
                <SelectItem value="NOT_PASS">NOT_PASS</SelectItem>
              </SelectContent>
            </Select>
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