// src/components/ViewScoreModal.tsx
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
  const doc = session.documents && session.documents.length > 0 ? session.documents[0] : null; // Đổi tên để tránh nhầm lẫn với DOM

  // Hàm tải tài liệu
  const handleDownloadDocument = (url: string, fileName: string) => {
    const link = window.document.createElement("a"); // Dùng window.document để rõ ràng
    link.href = url;
    link.download = fileName;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

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
          <div>
            <Label>Tài liệu</Label>
            {doc ? (
              <div className="flex items-center gap-2">
                <p className="text-sm text-green-500">
                  {doc.fileName || "Tài liệu không có tên"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDownloadDocument(
                      doc.fileUrl,
                      doc.fileName || `document-${session.group?.groupCode || "unknown"}`
                    )
                  }
                  disabled={!doc.fileUrl} // Vô hiệu hóa nếu không có fileUrl
                >
                  Tải tài liệu
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-700">Chờ nhóm trưởng nộp tài liệu:</p>
            )}
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