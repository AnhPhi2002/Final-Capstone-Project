import React from "react";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ViewScoreModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  schedule: DefenseSchedule;
}

export const ViewScoreModal: React.FC<ViewScoreModalProps> = ({
  open,
  setOpen,
  schedule,
}) => {
  // Tạo map để lấy email từ group.members dựa trên studentId
  const studentEmailMap = new Map(
    schedule.group.members.map(member => [member.studentId, member.student.user.email])
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kết quả bảo vệ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {schedule.memberResults && schedule.memberResults.length > 0 ? (
            schedule.memberResults.map((result, index) => {
              const email = studentEmailMap.get(result.studentId) ?? "Chưa có email";

              return (
                <div key={index} className="border-b pb-2">
                  <p>
                    <strong>Mã sinh viên:</strong> {result.student.studentCode} - {email}
                  </p>
                  <p>
                    <strong>Kết quả:</strong> {result.result || "Chưa có kết quả"}
                  </p>
                  <p>
                    <strong>Phản hồi:</strong> {result.feedback || "Chưa có phản hồi"}
                  </p>
                  {/* <p>
                    <strong>Người đánh giá:</strong>{" "}
                    {result.evaluatedBy || "Chưa có người đánh giá"}
                  </p> */}
                </div>
              );
            })
          ) : (
            <p>Không có kết quả bảo vệ nào.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};