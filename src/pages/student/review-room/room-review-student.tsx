// src/components/room-review-student.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchReviewSchedulesForStudent } from "@/lib/api/redux/councilReviewSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns"; // Import columns từ file columns.tsx
import { DataTable } from "./data-table"; // Import DataTable từ file data-table.tsx
import Header from "@/components/header";

// Định nghĩa type cho dữ liệu
export interface ReviewSchedule {
  schedule: {
    id: string;
    councilId: string;
    groupId: string;
    topicId: string;
    reviewTime: string;
    room: string;
    reviewRound: number;
    status: string;
    council: string;
    group: string;
    topic: string;
  };
  assignment: {
    id: string;
    score: number | null;
    status: string;
    feedback: string | null;
    reviewerId: string | null;
    assignedAt: string;
    reviewedAt: string | null;
  };
  url: string | null;
}

export const RoomReviewStudent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewSchedules, loadingSchedules, errorSchedules } = useSelector(
    (state: RootState) => state.councilReview
  );

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchReviewSchedulesForStudent());
  }, [dispatch]);

  // Cấu hình bảng
  const table = useReactTable({
    data: reviewSchedules || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Lịch xét duyệt sinh viên"
        href="/student-dashboard" // Giả định đường dẫn quay lại
        currentPage="Phòng xét duyệt"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingSchedules ? (
          <p className="text-center text-gray-500">Đang tải lịch xét duyệt...</p>
        ) : errorSchedules ? (
          <p className="text-center text-red-500">{errorSchedules}</p>
        ) : reviewSchedules.length === 0 ? (
          <p className="text-center text-gray-500">Không có lịch xét duyệt nào.</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};