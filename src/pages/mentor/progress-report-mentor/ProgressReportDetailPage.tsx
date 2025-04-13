import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";
import { sendFeedback } from "@/lib/api/redux/mentorProgressReportSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import { toast } from "sonner";

export const ProgressReportDetailPage = () => {
  const { reportId, semesterId } = useParams<{ reportId: string; semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reports = useSelector((state: RootState) => state.mentorProgressReport.reports);
  const { feedbackLoading, feedbackError } = useSelector((state: RootState) => state.mentorProgressReport);
  const [mentorFeedback, setMentorFeedback] = useState("");

  console.log("Debug - Semester ID:", semesterId, "Report ID:", reportId, "Reports:", reports);

  const report = reports?.find((r: ProgressReport) => r.id === reportId);

  const handleFeedback = async () => {
    if (!reportId || !semesterId) return;
    if (!mentorFeedback.trim()) {
      toast.error("Vui lòng nhập phản hồi!");
      return;
    }
    try {
      await dispatch(sendFeedback({ reportId, semesterId, mentorFeedback })).unwrap();
      toast.success("Gửi phản hồi thành công!");
      setMentorFeedback(""); // Reset input sau khi gửi thành công
    } catch (error) {
      toast.error(feedbackError || "Lỗi không xác định khi gửi phản hồi!");
    }
  };

  if (!semesterId) {
    return (
      <div className="flex flex-col h-screen">
        <Header
          title="Báo cáo tiến độ"
          href="/progress-report-mentor"
          currentPage="Chi tiết báo cáo"
        />
        <div className="p-5 flex-1 overflow-auto">
          <p className="text-center text-gray-500">Không tìm thấy học kỳ.</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col h-screen">
        <Header
          title="Báo cáo tiến độ"
          href={`/progress-report-mentor/${semesterId}`}
          currentPage="Chi tiết báo cáo"
        />
        <div className="p-5 flex-1 overflow-auto">
          <p className="text-center text-gray-500">Không tìm thấy báo cáo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Báo cáo tiến độ"
        href={`/progress-report-mentor/${semesterId}`}
        currentPage="Chi tiết báo cáo"
      />
      <div className="p-5 flex-1 overflow-auto">
        <Card className="p-6 max-w-3xl mx-auto">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Mã Nhóm</p>
                <p className="font-semibold italic">{report.group.groupCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tuần</p>
                <p className="font-semibold italic">{report.weekNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                <Badge
                  className={
                    report.status === "SUBMITTED"
                      ? "bg-blue-100 text-blue-600"
                      : report.status === "REVIEWED"
                      ? "bg-green-100 text-green-600"
                      : report.status === "ACTIVE"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {report.status === "SUBMITTED"
                    ? "Đã nộp"
                    : report.status === "REVIEWED"
                    ? "Đã duyệt"
                    : report.status === "ACTIVE"
                    ? "Đang hoạt động"
                    : "Không xác định"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Đã đọc</p>
                <Badge
                  className={report.isRead ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
                >
                  {report.isRead ? "Đã đọc" : "Chưa đọc"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phần trăm hoàn thành</p>
                <p className="font-semibold italic">{report.completionPercentage}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngày nộp</p>
                <p className="font-semibold italic">
                  {report.submittedAt
                    ? new Date(report.submittedAt).toLocaleString()
                    : "Chưa nộp"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngày bắt đầu</p>
                <p className="font-semibold italic">
                  {report.startDate
                    ? new Date(report.startDate).toLocaleDateString()
                    : "Chưa có"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngày kết thúc</p>
                <p className="font-semibold italic">
                  {report.endDate
                    ? new Date(report.endDate).toLocaleDateString()
                    : "Chưa có"}
                </p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500 mb-1">Thành viên</p>
                <p className="font-semibold italic">
                  {report.group.members
                    .map((m) => `${m.student.studentCode} (${m.role.name})`)
                    .join(", ")}
                </p>
              </div> */}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Nội dung</p>
              <p className="italic text-gray-800">{report.content || "Chưa có nội dung"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phản hồi của giảng viên</p>
              <p className="italic text-gray-800">
                {report.mentorFeedback || "Chưa có phản hồi"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Nhập phản hồi mới</p>
              <Textarea
                value={mentorFeedback}
                onChange={(e) => setMentorFeedback(e.target.value)}
                placeholder="Nhập phản hồi của bạn..."
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
            {report.url && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Link tài liệu</p>
                <a
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline italic"
                >
                  {report.url}
                </a>
              </div>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={handleFeedback}
                disabled={feedbackLoading || !mentorFeedback.trim()}
              >
                {feedbackLoading ? "Đang gửi..." : "Gửi phản hồi"}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/lecturer/progress-report-mentor/${semesterId}`)}
              >
                Quay lại
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};