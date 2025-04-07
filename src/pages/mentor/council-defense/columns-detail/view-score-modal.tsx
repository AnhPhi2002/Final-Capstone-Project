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
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";

type ViewScoreModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  scheduleId: string;
};

export const ViewScoreModal: React.FC<ViewScoreModalProps> = ({ open, setOpen, scheduleId }) => {
  const schedule = useSelector((state: RootState) =>
    state.councilDefense.councilDetail?.defenseSchedules.find((s) => s.id === scheduleId)
  );

  if (!schedule) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin điểm</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-700">Không tìm thấy dữ liệu lịch bảo vệ.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Tạo map để lấy email từ group.members dựa trên studentId
  const studentEmailMap = new Map(
    schedule.group.members.map(member => [member.studentId, member.student.user.email])
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông tin điểm của nhóm {schedule.group?.groupCode}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Mã nhóm</Label>
            <p className="text-sm text-gray-700">{schedule.group?.groupCode || "N/A"}</p>
          </div>
          <div>
            <Label>Tên đề tài</Label>
            <p className="text-sm text-gray-700">
              {schedule.group.topicAssignments[0]?.topic.name || "N/A"}
            </p>
          </div>
          {schedule.memberResults.length > 0 ? (
            schedule.memberResults.map((result, index) => {
              const email = studentEmailMap.get(result.studentId) ?? "Chưa có email";

              return (
                <div key={index} className="border-t pt-2">
                  <div>
                    <Label>Mã sinh viên</Label>
                    <p className="text-sm text-gray-700">{result.student.studentCode}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm text-gray-700">{email}</p>
                  </div>
                  <div>
                    <Label>Kết quả</Label>
                    <p className="text-sm text-gray-700">{result.result || "Chưa có kết quả"}</p>
                  </div>
                  {/* <div>
                    <Label>Người chấm</Label>
                    <p className="text-sm text-gray-700">{result.evaluatedBy || "N/A"}</p>
                  </div> */}
                  <div>
                    <Label>Nhận xét</Label>
                    <p className="text-sm text-gray-700">{result.feedback || "Chưa có nhận xét"}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-700">Chưa có dữ liệu điểm.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};