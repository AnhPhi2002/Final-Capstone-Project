import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { uploadFile } from "@/lib/api/redux/uploadSlice";
import { addReportDefenseUrl } from "@/lib/api/redux/scheduleSlice";
import { useState } from "react";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { Label } from "@/components/ui/label";

interface ReportActionProps {
  schedule: DefenseSchedule;
}

export const ReportAction = ({ schedule }: ReportActionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const uploadState = useSelector((state: RootState) => state.upload);
  const scheduleState = useSelector((state: RootState) => state.schedule);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAddReport = async () => {
    if (!selectedFile) {
      toast.error("Vui lòng chọn file trước khi gửi!");
      return;
    }

    if (!schedule?.id) {
      toast.error("Không tìm thấy ID lịch bảo vệ!");
      return;
    }

    setIsProcessing(true);
    try {
      const uploadResult = await dispatch(uploadFile(selectedFile)).unwrap();
      const uploadedUrl = uploadResult as string;

      await dispatch(
        addReportDefenseUrl({ scheduleId: schedule.id, url: uploadedUrl })
      ).unwrap();

      toast.success("Báo cáo đã được gửi thành công!");
      setIsUploadModalOpen(false);
      setSelectedFile(null);
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi gửi báo cáo!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadDocument = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const UploadModalContent = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Thêm báo cáo bảo vệ</h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full"
          disabled={isProcessing}
        />

        {uploadState.loading && (
          <p className="text-blue-500">Đang tải file lên...</p>
        )}
        {uploadState.error && (
          <p className="text-red-500">{uploadState.error}</p>
        )}
        {uploadState.fileUrl && !uploadState.loading && (
          <div className="mb-4">
            <p className="text-green-500">File đã được tải lên:</p>
            <p className="text-green-500 break-all">{uploadState.fileUrl}</p>
          </div>
        )}

        {scheduleState.loading && (
          <p className="text-blue-500">Đang gửi báo cáo...</p>
        )}
        {scheduleState.error && (
          <p className="text-red-500">{scheduleState.error}</p>
        )}

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsUploadModalOpen(false)}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddReport}
            disabled={isProcessing || !selectedFile}
          >
            {isProcessing ? "Đang xử lý..." : "Thêm"}
          </Button>
        </div>
      </div>
    </div>
  );

  const ResultModalContent = () => {
    if (!schedule) return null;

    // Lấy memberResult đầu tiên từ mảng memberResults
    const memberResult = schedule.memberResults?.[0];
    const doc = schedule.documents?.[0]; // Đổi tên để tránh nhầm lẫn với DOM

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">Kết quả bảo vệ</h2>

          {memberResult ? (
            <div className="space-y-4">
              <div>
                <Label>Kết quả</Label>
                <p className="text-sm text-gray-700">{memberResult.result || "Chưa có kết quả"}</p>
              </div>
              <div>
                <Label>Phản hồi</Label>
                <p className="text-sm text-gray-700">{memberResult.feedback || "Chưa có phản hồi"}</p>
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
                          doc.fileName || `document-${schedule.group?.groupCode || "unknown"}`
                        )
                      }
                      disabled={!doc.fileUrl}
                    >
                      Tải tài liệu
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">Chưa có tài liệu</p>
                )}
              </div>
            </div>
          ) : (
            <p>Không có thông tin kết quả bảo vệ.</p>
          )}

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsResultModalOpen(false)}>
              Đóng
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 min-w-8 p-0 flex items-center justify-center"
            disabled={isProcessing}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành Động</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUploadModalOpen(true)}>
            Báo cáo bảo vệ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsResultModalOpen(true)}>
            Xem kết quả
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUploadModalOpen && createPortal(<UploadModalContent />, document.body)}
      {isResultModalOpen && createPortal(<ResultModalContent />, document.body)}
    </>
  );
};