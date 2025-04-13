import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { fetchReportDetail, resetProgressReport } from '@/lib/api/redux/progressReportSlice';
import { RootState, AppDispatch } from '@/lib/api/redux/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProgressReportDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedReport, loading, error } = useSelector((state: RootState) => state.progressReport);

  useEffect(() => {
    if (id) {
      dispatch(fetchReportDetail(id));
    }
    return () => {
      dispatch(resetProgressReport());
    };
  }, [id, dispatch]);

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!selectedReport) return <p className="text-center text-gray-500">Không tìm thấy báo cáo.</p>;

  return (
    <div className="mt-6 bg-white">
      <Card className="p-6 mx-10 shadow-md rounded-lg">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tuần</p>
              <p className="font-semibold italic">{selectedReport.weekNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
              <Badge
                className={
                  selectedReport.status === 'SUBMITTED'
                    ? 'bg-blue-100 text-blue-600'
                    : selectedReport.status === 'REVIEWED'
                    ? 'bg-green-100 text-green-600'
                    : selectedReport.status === 'ACTIVE'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-gray-100 text-gray-600'
                }
              >
                {selectedReport.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phần trăm hoàn thành</p>
              <p className="font-semibold italic">{selectedReport.completionPercentage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ngày gửi</p>
              <p className="font-semibold italic">
                {selectedReport.submittedAt
                  ? new Date(selectedReport.submittedAt).toLocaleString()
                  : 'Chưa gửi'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ngày bắt đầu</p>
              <p className="font-semibold italic">
                {selectedReport.startDate
                  ? new Date(selectedReport.startDate).toLocaleDateString()
                  : 'Chưa có'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ngày kết thúc</p>
              <p className="font-semibold italic">
                {selectedReport.endDate
                  ? new Date(selectedReport.endDate).toLocaleDateString()
                  : 'Chưa có'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Nhóm</p>
              <p className="font-semibold italic">{selectedReport.group.groupCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Giảng viên hướng dẫn</p>
              <p className="font-semibold italic">
                {selectedReport.mentors[0]?.mentor.fullName || 'Chưa có'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Nội dung</p>
            <p className="italic text-gray-800">{selectedReport.content}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Phản hồi của giảng viên</p>
            {selectedReport.mentorFeedbacks && selectedReport.mentorFeedbacks.length > 0 ? (
              <ul className="space-y-2">
                {selectedReport.mentorFeedbacks.map((feedback, index) => (
                  <li key={index} className="italic text-gray-800 border-l-2 border-gray-300 pl-4">
                    {feedback.feedback || "Không có nội dung phản hồi"}
                    <span className="block text-sm text-gray-500">
                      {feedback.mentorName} ({feedback.mentorEmail})
                      {feedback.readAt && ` - Đã đọc: ${new Date(feedback.readAt).toLocaleString()}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-800">Chưa có phản hồi</p>
            )}
          </div>
        </CardContent>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => navigate('/student/progress-report')}>
            Quay lại
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProgressReportDetail;