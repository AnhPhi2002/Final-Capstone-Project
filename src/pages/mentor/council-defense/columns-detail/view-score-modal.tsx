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
      <DialogContent className="max-w-4xl"> {/* Tăng chiều rộng tối đa của modal */}
        <DialogHeader>
          <DialogTitle>Thông tin điểm của nhóm {schedule.group?.groupCode}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          {schedule.memberResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left text-sm font-medium">Mã sinh viên</th>
                    <th className="p-2 text-left text-sm font-medium">Email</th>
                    <th className="p-2 text-left text-sm font-medium">Kết quả</th>
                    <th className="p-2 text-left text-sm font-medium">Nhận xét</th>
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
                        <td className="p-2 text-sm text-gray-700">{result.feedback || "Chưa có nhận xét"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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