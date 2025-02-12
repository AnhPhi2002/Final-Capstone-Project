import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type UpdateSemesterProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterId: string;
};

export const UpdateSemester: React.FC<UpdateSemesterProps> = ({
  open,
  setOpen,
  semesterId,
}) => {
  const [formValues, setFormValues] = useState({
    year: "",
    code: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    console.log("Cập nhật học kỳ:", { semesterId, ...formValues });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Cập nhật học kỳ</h2>
        <p className="text-gray-600 mb-6">
          Cập nhật thông tin học kỳ bên dưới và nhấn "Lưu" để xác nhận.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Năm học</label>
            <select
              name="year"
              value={formValues.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Chọn năm học</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mã học kỳ</label>
            <input
              type="text"
              name="code"
              value={formValues.code}
              onChange={handleChange}
              placeholder="VD: Spring2025"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="endDate"
              value={formValues.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Hạn đăng ký
            </label>
            <input
              type="date"
              name="registrationDeadline"
              value={formValues.registrationDeadline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Chọn trạng thái</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETE">COMPLETE</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Lưu cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};
