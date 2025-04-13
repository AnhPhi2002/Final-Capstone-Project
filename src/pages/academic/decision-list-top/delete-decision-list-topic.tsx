"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { deleteDecision } from "@/lib/api/redux/decisionListTopc";

interface DeleteDecisionListTopicProps {
  decisionId: string;
  semesterId: string;
  onClose: () => void; // Callback to close the modal
}

export const DeleteDecisionListTopic: React.FC<DeleteDecisionListTopicProps> = ({
  decisionId,
  semesterId,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.decisionListTop);
  const [open, setOpen] = useState(true);

  const handleDelete = async () => {
    try {
      await dispatch(deleteDecision(decisionId)).unwrap();
      toast.success("Xóa quyết định thành công");
      setOpen(false);
      onClose(); // Close the modal
      navigate(`/academic/decision-list-top/${semesterId}`); // Navigate back to the decision list
    } catch (error: any) {
      toast.error("Lỗi khi xóa quyết định", { description: error });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    onClose(); // Close the modal
  };

  // Prevent rendering if modal is closed
  if (!open) return null;

  return (
    <>
      <Toaster position="top-right" richColors />
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={handleCancel}
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
            onClick={handleCancel}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-100 transition"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Đang xóa..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </>
  );
};