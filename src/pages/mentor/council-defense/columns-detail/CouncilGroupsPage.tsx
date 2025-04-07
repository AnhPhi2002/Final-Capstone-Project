// src/components/council-defense-groups-page.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDefenseDetailForMentor } from "@/lib/api/redux/councilDefenseSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { groupColumns } from "./columns";
import Header from "@/components/header";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";

export const CouncilDefenseGroupsPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilDefense);

  useEffect(() => {
    if (councilId && semesterId && !councilDetail) {
      dispatch(fetchCouncilDefenseDetailForMentor({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId, councilDetail]);

  const table = useReactTable<DefenseSchedule>({
    data: councilDetail?.defenseSchedules || [],
    columns: groupColumns(semesterId || ""), // Truyền semesterId vào groupColumns
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!councilId || !semesterId) {
    return <p className="text-center text-red-500">Council ID hoặc Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Thông tin nhóm bảo vệ"
        href="/lecturer/check-defense"
        currentPage="Quản lý hội đồng"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingDetail ? (
          <p className="text-center text-gray-500">Đang tải thông tin nhóm...</p>
        ) : !councilDetail ? (
          <p className="text-center text-gray-500">Không có dữ liệu hội đồng!</p>
        ) : councilDetail.defenseSchedules.length === 0 ? (
          <p className="text-center text-gray-500">Không có lịch bảo vệ nào.</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};