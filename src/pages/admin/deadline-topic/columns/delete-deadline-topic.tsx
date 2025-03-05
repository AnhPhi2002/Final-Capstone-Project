import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSubmissionRound } from "@/lib/api/redux/submissionRoundSlice";
import { AppDispatch } from "@/lib/api/redux/store";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";

type DeleteDeadlineTopicProps = {
  roundId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteDeadlineTopic: React.FC<DeleteDeadlineTopicProps> = ({ roundId, open, setOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  if (!open) return null; // ✅ Ngăn render nếu `open === false`

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const resultAction = await dispatch(deleteSubmissionRound(roundId));
  
      if (deleteSubmissionRound.fulfilled.match(resultAction)) {
        toast.success("Vòng nộp đã được xóa thành công!");
        setOpen(false); 
        navigate(`/deadline-topic`);
      } else {
        throw new Error("Xóa thất bại!");
      }
    } catch (error: any) {
      toast.error(`Xóa thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    } finally {
      setDeleting(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Bạn có chắc chắn muốn xóa vòng nộp này?</h2>
        <p className="text-gray-600 mb-6">Hành động này không thể hoàn tác. Vòng nộp sẽ bị xóa vĩnh viễn khỏi hệ thống.</p>

        <div className="flex justify-end space-x-4">
          <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
            Hủy
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-4 py-2 rounded-lg ${deleting ? "bg-gray-400" : "bg-red-600 text-white"}`}
          >
            {deleting ? "Đang xóa..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};
