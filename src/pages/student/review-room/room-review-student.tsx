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
    council: {
      code: string;
      name: string;
    };
    group: {
      groupCode: string;
      semesterId: string;
      topicAssignments: {
        defenseRound: number | null;
        defendStatus: string | null;
      }[];
    };
    topic: {
      topicCode: string;
      name: string;
    };
  };
  assignment: ReviewScheduleAssignment | null; // Updated to single object or null
  url: string | null;
  documents: ReviewScheduleDocument[];
}

export interface ReviewScheduleDocument {
  fileName: string;
  fileUrl: string;
}

export interface ReviewScheduleAssignment {
  id: string;
  score: number | null;
  feedback: string | null;
  status: string;
  reviewRound: number;
  reviewer: {
    fullName?: string;
    email?: string;
  };
}

export const RoomReviewStudent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewSchedules, loadingSchedules, errorSchedules } = useSelector(
    (state: RootState) => state.councilReview
  );

  useEffect(() => {
    dispatch(fetchReviewSchedulesForStudent());
  }, [dispatch]);

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
        title="Lịch kiểm tra nhóm"
        href=""
        currentPage="Chi tiết lịch kiểm tra"
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