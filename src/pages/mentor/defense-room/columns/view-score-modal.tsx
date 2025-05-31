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
      <DialogContent className="max-w-4xl"> {/* Tăng chiều rộng tối đa của modal */}
        <DialogHeader>
          <DialogTitle>Kết quả bảo vệ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {schedule.memberResults && schedule.memberResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left text-sm font-medium">Mã sinh viên</th>
                    <th className="p-2 text-left text-sm font-medium">Email</th>
                    <th className="p-2 text-left text-sm font-medium">Kết quả</th>
                    <th className="p-2 text-left text-sm font-medium">Phản hồi</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.memberResults.map((result, index) => {
                    const email = studentEmailMap.get(result.studentId) ?? "Chưa có email";
                    return (
                      <tr key={index} className="border-t">
                        <td className="p-2 text-sm text-gray-700">{result.student.studentCode}</td>
                        <td className="p-2 text-sm text-gray-700">{email}</td>
                        <td className="p-2 text-sm text-gray-700">
                          {result.result
                            ? result.result === "PASS"
                              ? "Đạt"
                              : result.result === "NOT_PASS"
                                ? "Không đạt"
                                : result.result
                            : "Chưa có kết quả"}
                        </td>
                        <td className="p-2 text-sm text-gray-700">{result.feedback || "Chưa có phản hồi"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Không có kết quả bảo vệ nào.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};