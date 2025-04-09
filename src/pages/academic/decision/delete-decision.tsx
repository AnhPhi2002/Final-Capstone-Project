import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { deleteDecision } from "@/lib/api/redux/decisionSlice";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router";

type DeleteDecisionProps = {
  decisionId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteDecision: React.FC<DeleteDecisionProps> = ({
  decisionId,
  open,
  setOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await dispatch(deleteDecision(decisionId)).unwrap();
      toast.success("Đã xóa quyết định!");
      setOpen(false);
      navigate("/academic/decision"); // hoặc navigate về học kỳ nếu bạn muốn
    } catch (error: any) {
      toast.error(`Xóa thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    }
  };

  if (!open) return null;

  return (
    <>
      <Toaster position="top-right" richColors />
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={() => setOpen(false)}
      />
      <div
        className={`
          fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border 
          bg-background p-6 shadow-lg sm:rounded-lg
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            Bạn có chắc chắn muốn xóa bảng quyết định này?
          </h2>
          <p className="text-sm text-muted-foreground">
            Hành động này không thể hoàn tác. Quyết định sẽ bị xóa khỏi hệ thống.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <button
            onClick={() => setOpen(false)}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};
