// src/components/room-review-student.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchDefenseSchedulesForStudent } from "@/lib/api/redux/councilDefenseSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns"; // Import columns từ file columns.tsx
import { DataTable } from "./data-table"; // Import DataTable từ file data-table.tsx
import Header from "@/components/header";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule"; // Import type từ defenseSchedule.ts

export const RoomDefenseStudent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewSchedules, loadingSchedules, errorSchedules } = useSelector(
    (state: RootState) => state.councilDefense // Sửa từ councilReview thành councilDefense
  );

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchDefenseSchedulesForStudent());
  }, [dispatch]);

  // Cấu hình bảng
  const table = useReactTable<DefenseSchedule>({
    data: reviewSchedules || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Lịch bảo vệ sinh viên"
        href="/student-dashboard" // Giả định đường dẫn quay lại
        currentPage="Phòng bảo vệ"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingSchedules ? (
          <p className="text-center text-gray-500">Đang tải lịch bảo vệ...</p>
        ) : errorSchedules ? (
          <p className="text-center text-red-500">{errorSchedules}</p>
        ) : reviewSchedules.length === 0 ? (
          <p className="text-center text-gray-500">Không có lịch bảo vệ nào.</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};