// src/components/council-defense-members-page.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDefenseDetailForMentor } from "@/lib/api/redux/councilDefenseSlice"; // Sửa từ councilReviewSlice
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { memberColumns } from "./columns";
import Header from "@/components/header";

export const CouncilDefenseMembersPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilDefense); // Sửa từ councilReview

  useEffect(() => {
    if (councilId && semesterId && !councilDetail) {
      dispatch(fetchCouncilDefenseDetailForMentor({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId, councilDetail]);

  const table = useReactTable({
    data: councilDetail?.members || [],
    columns: memberColumns,
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
        title="Thành viên hội đồng bảo vệ"
        href="/lecturer/check-defense"
        currentPage="Quản lý hội đồng"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingDetail ? (
          <p className="text-center text-gray-500">Đang tải danh sách thành viên...</p>
        ) : !councilDetail ? (
          <p className="text-center text-gray-500">Không có dữ liệu hội đồng!</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};