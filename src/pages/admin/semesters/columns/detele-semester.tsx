import React from "react";

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
  const handleDelete = async () => {
    console.log(`Deleting semester ${semesterId}`);
    // Thêm logic xóa học kỳ thực tế ở đây
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Bạn có chắc chắn muốn xóa học kỳ này?</h2>
        <p className="text-gray-600 mb-6">
          Hành động này không thể hoàn tác. Học kỳ sẽ bị xóa vĩnh viễn khỏi hệ thống.
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
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
