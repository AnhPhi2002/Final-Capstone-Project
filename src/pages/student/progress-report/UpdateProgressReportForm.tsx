import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProgressReport } from "@/lib/api/redux/progressReportSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UpdateProgressReportFormProps {
  report: ProgressReport;
  onCancel: () => void;
}

const UpdateProgressReportForm = ({ report, onCancel }: UpdateProgressReportFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.progressReport);
  const [formData, setFormData] = useState({
    content: report.content || "",
    completionPercentage: report.completionPercentage || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      toast.error("Vui lòng nhập nội dung báo cáo!");
      return;
    }
    if (formData.completionPercentage < 0 || formData.completionPercentage > 100) {
      toast.error("Phần trăm hoàn thành phải từ 0 đến 100!");
      return;
    }
    try {
      await dispatch(
        updateProgressReport({
          reportId: report.id,
          content: formData.content,
          completionPercentage: formData.completionPercentage,
        })
      ).unwrap();
      toast.success("Cập nhật báo cáo thành công!");
      onCancel();
    } catch (err: any) {
      toast.error(err || "Lỗi không xác định khi cập nhật báo cáo!");
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Nội dung</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
          placeholder="Nhập nội dung báo cáo..."
          rows={4}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Phần trăm hoàn thành</label>
        <Input
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
        <Button type="submit" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật báo cáo"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default UpdateProgressReportForm;