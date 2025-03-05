import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { X } from "lucide-react";
import { Lecturer } from "@/types/Lecturer";

interface UpdateReviewTopicCouncilProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  lecturer: Lecturer;
  refetchData?: () => void;
}

export const UpdateReviewTopicCouncil: React.FC<UpdateReviewTopicCouncilProps> = ({
  open,
  setOpen,
  lecturer,
  refetchData,
}) => {
  const [formValues, setFormValues] = useState({
    fullName: lecturer.fullName,
    email: lecturer.email,
    lecturerCode: lecturer.lecturerCode,
    isActive: lecturer.isActive,
  });

  useEffect(() => {
    if (open) {
      setFormValues({
        fullName: lecturer.fullName,
        email: lecturer.email,
        lecturerCode: lecturer.lecturerCode,
        isActive: lecturer.isActive,
      });
    }
  }, [open, lecturer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "ACTIVE" : value,
    }));
  };

  const handleSave = () => {
    if (!formValues.fullName || !formValues.email || !formValues.lecturerCode) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    console.log("Dữ liệu giảng viên cập nhật:", formValues);
    toast.success("Cập nhật giảng viên thành công!");

    if (refetchData) refetchData();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Cập nhật giảng viên</h2>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên giảng viên</label>
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mã giảng viên</label>
            <input
              type="text"
              name="lecturerCode"
              value={formValues.lecturerCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              name="isActive"
              value={formValues.isActive ? "ACTIVE" : "INACTIVE"}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
            Hủy
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg">
            Lưu cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};
