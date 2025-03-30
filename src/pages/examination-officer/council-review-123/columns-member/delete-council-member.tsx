import React from "react";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { deleteCouncilMember } from "@/lib/api/redux/councilSlice";

export type DeleteReviewTopicCouncilMemberProps = {
  open: boolean;
  councilId: string;
  userId: string;
  setOpen: (open: boolean) => void;
  refetchData?: () => void;
};

export const DeleteReviewTopicCouncilMember: React.FC<DeleteReviewTopicCouncilMemberProps> = ({
  open,
  setOpen,
  councilId,
  userId,
  refetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteCouncilMember({ councilId, userId })).unwrap();
      toast.success("Xóa thành viên thành công!");
      setOpen(false);
      refetchData?.(); // Làm mới danh sách nếu có function refetch
    } catch (error: any) {
      // toast.error(${error} || "Xóa thành viên thất bại!");
      toast.error(`Tạo thất bại: ${error}`);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Xóa thành viên</h2>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa thành viên này khỏi hội đồng? Hành động này không thể hoàn tác.
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
