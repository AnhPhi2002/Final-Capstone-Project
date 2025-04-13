import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProgressReport, fetchMyReports, resetProgressReport } from '@/lib/api/redux/progressReportSlice';
import { RootState, AppDispatch } from '@/lib/api/redux/store';
import { CreateProgressReportRequest, ProgressReport } from '@/lib/api/redux/types/progressReport';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProgressReportForm = ({ onCancel }: { onCancel?: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { reports, loading, error, createSuccess } = useSelector((state: RootState) => state.progressReport);
  const [formData, setFormData] = useState<CreateProgressReportRequest>({
    weekNumber: '',
    content: '',
    completionPercentage: 0,
  });

  // Lấy danh sách báo cáo khi component mount
  useEffect(() => {
    dispatch(fetchMyReports());
  }, [dispatch]);

  // Xử lý thông báo và reset form khi tạo báo cáo thành công
  useEffect(() => {
    if (createSuccess) {
      toast.success('Tạo báo cáo thành công!');
      setFormData({ weekNumber: '', content: '', completionPercentage: 0 });
      dispatch(resetProgressReport());
      if (onCancel) onCancel(); // Đóng dialog sau khi tạo thành công
    }
    if (error) {
      toast.error(error);
    }
  }, [createSuccess, error, dispatch, onCancel]);

  // Lọc các tuần có status ACTIVE
  const activeWeeks = reports
    ? reports.filter((report: ProgressReport) => report.status === 'ACTIVE').map((report: ProgressReport) => report.weekNumber)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.weekNumber) {
      toast.error('Vui lòng chọn tuần báo cáo.');
      return;
    }
    try {
      await dispatch(createProgressReport(formData)).unwrap();
      // Thông báo sẽ được xử lý trong useEffect
    } catch (err) {
      // Lỗi đã được xử lý trong useEffect
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Tuần số</label>
        <select
          value={formData.weekNumber}
          onChange={(e) => setFormData({ ...formData, weekNumber: e.target.value })}
          className="w-full p-2 border rounded"
          required
          disabled={loading || activeWeeks.length === 0}
        >
          <option value="" disabled>
            {activeWeeks.length === 0 ? 'Không có tuần ACTIVE' : 'Chọn tuần'}
          </option>
          {activeWeeks.map((week) => (
            <option key={week} value={week}>
              Tuần {week}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Nội dung</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Phần trăm hoàn thành</label>
        <input
          type="number"
          value={formData.completionPercentage}
          onChange={(e) => setFormData({ ...formData, completionPercentage: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          min="0"
          max="100"
          required
          disabled={loading}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={loading || activeWeeks.length === 0}>
          {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProgressReportForm;