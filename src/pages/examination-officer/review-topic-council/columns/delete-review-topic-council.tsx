import React from "react";
import { Toaster, toast } from "sonner";

export type DeleteReviewTopicCouncilProps = {
  open: boolean;
  lecturerId: string;
  setOpen: (open: boolean) => void;
};

export const DeleteReviewTopicCouncil: React.FC<DeleteReviewTopicCouncilProps> = ({
  open,
  setOpen,
  lecturerId,
}) => {
  const handleDelete = () => {
    console.log("Giảng viên đã bị xóa:", lecturerId);
    toast.success("Giảng viên đã được xóa thành công!");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Xóa giảng viên</h2>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa giảng viên này? Hành động này không thể hoàn tác.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
