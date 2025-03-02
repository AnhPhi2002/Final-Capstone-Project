  import React from "react";
  import { useDispatch } from "react-redux";
  // import { deleteDeadlineTopic } from "@/lib/api/redux/deadlineTopicSlice";
  import { AppDispatch } from "@/lib/api/redux/store";
  import { useNavigate } from "react-router";
  import { Toaster, toast } from "sonner";

  type DeleteDeadlineTopicProps = {
    topicId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

  export const DeleteDeadlineTopic: React.FC<DeleteDeadlineTopicProps> = ({
    topicId,
    open,
    setOpen,
  }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleDelete = async () => {
      // try {
      //   await dispatch(deleteDeadlineTopic(topicId)).unwrap();
      //   toast.success("Đợt nộp đề tài đã được xóa thành công!");
      //   navigate(`/deadline-topics`);
      //   setOpen(false);
      // } catch (error: any) {
      //   toast.error(`Xóa thất bại: ${error.message || "Đã xảy ra lỗi"}`);
      // }
    };

    if (!open) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Toaster position="top-right" richColors duration={3000} />
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Bạn có chắc chắn muốn xóa đợt nộp này?</h2>
          <p className="text-gray-600 mb-6">
            Hành động này không thể hoàn tác. Đợt nộp sẽ bị xóa vĩnh viễn khỏi hệ thống.
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
