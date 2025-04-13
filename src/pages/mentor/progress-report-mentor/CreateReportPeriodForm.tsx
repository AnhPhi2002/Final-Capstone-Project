import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReportPeriod } from "@/lib/api/redux/mentorProgressReportSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateReportPeriodFormProps {
  semesterId: string;
  groups: any[];
  onCancel: () => void;
}

const CreateReportPeriodForm = ({ semesterId, groups, onCancel }: CreateReportPeriodFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.mentorProgressReport);
  const [formData, setFormData] = useState({
    groupId: "",
    weekNumber: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.groupId) {
      toast.error("Vui lòng chọn nhóm!");
      return;
    }
    if (!formData.weekNumber || isNaN(Number(formData.weekNumber))) {
      toast.error("Vui lòng nhập số tuần hợp lệ!");
      return;
    }
    if (!formData.startDate) {
      toast.error("Vui lòng chọn ngày bắt đầu!");
      return;
    }
    if (!formData.endDate) {
      toast.error("Vui lòng chọn ngày kết thúc!");
      return;
    }
    try {
      await dispatch(
        createReportPeriod({
          semesterId,
          groupId: formData.groupId,
          weekNumber: Number(formData.weekNumber),
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
        })
      ).unwrap();
      toast.success("Tạo lịch báo cáo thành công!");
      onCancel();
    } catch (error: any) {
      toast.error(error || "Lỗi không xác định khi tạo lịch báo cáo!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Nhóm</label>
        <Select
          value={formData.groupId}
          onValueChange={(value) => setFormData({ ...formData, groupId: value })}
          disabled={loading || groups.length === 0}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={groups.length === 0 ? "Không có nhóm" : "Chọn nhóm"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Nhóm</SelectLabel>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.groupCode}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Số tuần</label>
        <Input
          type="number"
          value={formData.weekNumber}
          onChange={(e) => setFormData({ ...formData, weekNumber: e.target.value })}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
          placeholder="Nhập số tuần (ví dụ: 2)"
          min="1"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Ngày bắt đầu</label>
        <Input
          type="datetime-local"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Ngày kết thúc</label>
        <Input
          type="datetime-local"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo lịch báo cáo"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default CreateReportPeriodForm;