import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateDeadlineTopic } from "@/lib/api/redux/deadlineTopicSlice";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { Toaster, toast } from "sonner";

type UpdateDeadlineTopicProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  topicId: string;
  refetchData?: () => void;
};

export const UpdateDeadlineTopic: React.FC<UpdateDeadlineTopicProps> = ({
  open,
  setOpen,
  topicId,
  refetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  // const topicDetail = useSelector((state: RootState) => state.deadlineTopics.topicDetail);
  // const allTopics = useSelector((state: RootState) => state.deadlineTopics.data);

  const [formValues, setFormValues] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // useEffect(() => {
  //   if (open && topicDetail) {
  //     setFormValues({
  //       name: topicDetail.name || "",
  //       startDate: formatDateForInput(topicDetail.startDate) || "",
  //       endDate: formatDateForInput(topicDetail.endDate) || "",
  //       status: topicDetail.status || "ACTIVE",
  //     });
  //   }
  // }, [open, topicDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    if (!formValues.name || !formValues.startDate || !formValues.endDate || !formValues.status) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const start = new Date(formValues.startDate);
    const end = new Date(formValues.endDate);

    if (end <= start) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    // const isDuplicateName = allTopics.some(
    //   (topic) => topic.name === formValues.name && topic.id !== topicId
    // );

    // if (isDuplicateName) {
    //   toast.error("Tên đợt nộp đã tồn tại!");
    //   return;
    // }

    // try {
    //   await dispatch(updateDeadlineTopic({ topicId, updatedData: formValues })).unwrap();
    //   toast.success("Cập nhật đợt nộp đề tài thành công!");
    //   if (refetchData) refetchData();
    //   setOpen(false);
    // } catch (error: any) {
    //   toast.error(`Cập nhật thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    // }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Cập nhật đợt nộp đề tài</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên đợt nộp</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="VD: Đợt nộp luận văn"
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

          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="ACTIVE">Hoạt động </option>
              <option value="COMPLETE">Không hoạt động </option>
            </select>
          </div>
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
