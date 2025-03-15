import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSemester } from "@/lib/api/redux/semesterSlice";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { Toaster, toast } from "sonner";

type UpdateSemesterProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  semesterId: string;
  refetchData?: () => void;
};

export const UpdateSemester: React.FC<UpdateSemesterProps> = ({
  open,
  setOpen,
  semesterId,
  refetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const semesterDetail = useSelector((state: RootState) => state.semesters.semesterDetail);
  const allSemesters = useSelector((state: RootState) => state.semesters.data);

  const [formValues, setFormValues] = useState({
    code: "",
    startDate: "",
    endDate: "",
  });

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (open && semesterDetail) {
      setFormValues({
        code: semesterDetail.code || "",
        startDate: formatDateForInput(semesterDetail.startDate) || "",
        endDate: formatDateForInput(semesterDetail.endDate) || "",
      });
    }
  }, [open, semesterDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    if (!formValues.code || !formValues.startDate || !formValues.endDate) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const start = new Date(formValues.startDate);
    const end = new Date(formValues.endDate);

    if (end <= start) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const isDuplicateCode = allSemesters.some(
      (semester) => semester.code === formValues.code && semester.id !== semesterId
    );

    if (isDuplicateCode) {
      toast.error("Mã học kỳ đã tồn tại!");
      return;
    }

    try {
      await dispatch(updateSemester({ semesterId, updatedData: formValues })).unwrap();
      toast.success("Cập nhật học kỳ thành công!");
      if (refetchData) refetchData();
      setOpen(false);
    } catch (error: any) {
      toast.error(`Cập nhật thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Cập nhật học kỳ</h2>
        <div className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
            <input
              type="date"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
            <input
              type="date"
              name="endDate"
              value={formValues.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="ACTIVE">Hoạt động </option>
              <option value="COMPLETE">Không hoạt động </option>
              <option value="UPCOMING">Chờ đợi </option>
            </select>
          </div> */}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
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
