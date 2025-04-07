// src/components/mentor-check-defense.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchDefenseSchedulesForMentor } from "@/lib/api/redux/councilDefenseSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule"; 

export const MentorCheckDefense: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewSchedulesMentor, loadingSchedulesMentor, errorSchedulesMentor } = useSelector(
    (state: RootState) => state.councilDefense // Sửa từ councilReview thành councilDefense
  );
  const { semesterId } = useParams<{ semesterId?: string }>();

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchDefenseSchedulesForMentor({ semesterId }));
    }
  }, [dispatch, semesterId]);

  const table = useReactTable<DefenseSchedule>({
    data: reviewSchedulesMentor || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!semesterId) {
    return <p className="text-center text-red-500">Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Lịch bảo vệ giảng viên"
        href="/lecturer-dashboard"
        currentPage="Phòng bảo vệ"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingSchedulesMentor ? (
          <p className="text-center text-gray-500">Đang tải lịch bảo vệ...</p>
        ) : errorSchedulesMentor ? (
          <p className="text-center text-red-500">{errorSchedulesMentor}</p>
        ) : !reviewSchedulesMentor || reviewSchedulesMentor.length === 0 ? (
          <p className="text-center text-gray-500">Không có lịch bảo vệ nào.</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};