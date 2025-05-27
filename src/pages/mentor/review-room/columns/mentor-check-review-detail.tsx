// src/components/mentor-check-review.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchReviewSchedulesForMentor } from "@/lib/api/redux/councilReviewSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";

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

export const MentorCheckReview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewSchedulesMentor, loadingSchedulesMentor, errorSchedulesMentor } = useSelector(
    (state: RootState) => state.councilReview
  );
  const { semesterId } = useParams<{ semesterId?: string }>(); // Lấy semesterId từ URL

  // Fetch schedules khi component mount hoặc semesterId thay đổi
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchReviewSchedulesForMentor({ semesterId }));
    }
  }, [dispatch, semesterId]);

  // Cấu hình bảng
  const table = useReactTable({
    data: reviewSchedulesMentor || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Kiểm tra semesterId hợp lệ
  if (!semesterId) {
    return <p className="text-center text-red-500">Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Lịch kiểm tra nhóm"
        href="/lecturer-dashboard"
        currentPage="Phòng kiểm tra"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingSchedulesMentor ? (
          <p className="text-center text-gray-500">Đang tải lịch xét duyệt...</p>
        ) : errorSchedulesMentor ? (
          <p className="text-center text-red-500">{errorSchedulesMentor}</p>
        ) : !reviewSchedulesMentor || reviewSchedulesMentor.length === 0 ? (
          <p className="text-center text-gray-500">Không có lịch xét duyệt nào.</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
}; 