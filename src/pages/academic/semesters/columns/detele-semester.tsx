import React from "react";
import { useDispatch } from "react-redux";
import { deleteSemester } from "@/lib/api/redux/semesterSlice";
import { AppDispatch } from "@/lib/api/redux/store";
import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";

type DeleteSemesterProps = {
  semesterId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DeleteSemester: React.FC<DeleteSemesterProps> = ({
  semesterId,
  open,
  setOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await dispatch(deleteSemester(semesterId)).unwrap();
      toast.success("Học kỳ đã được xóa thành công!");
      setOpen(false);
      navigate("/academic/semester");
    } catch (error: any) {
      toast.error(`Xóa thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    }
  };

  if (!open) return null;

  return (
    <>
      <Toaster position="top-right" richColors duration={3000} />
      <div className="fixed inset-0 z-50 bg-black/80 "
      onClick={() => setOpen(false)} />
      {/*backdrop-blur-sm làm mờ backgroup */}
      <div
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95
        data-[state=closed]:slide-out-to-left-1/2
        data-[state=closed]:slide-out-to-top-[48%]
        data-[state=open]:slide-in-from-left-1/2
        data-[state=open]:slide-in-from-top-[48%]
        sm:rounded-lg`}
        onClick={(e) => e.stopPropagation()}
        data-state={open ? "open" : "closed"}
      >
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            Bạn có chắc chắn muốn xóa học kỳ này?
          </h2>
          <p className="text-sm text-muted-foreground">
            Hành động này không thể hoàn tác. Học kỳ sẽ bị xóa vĩnh viễn khỏi hệ
            thống.
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
