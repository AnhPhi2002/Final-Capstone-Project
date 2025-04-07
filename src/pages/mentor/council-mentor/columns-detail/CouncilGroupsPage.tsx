// src/components/CouncilReviewGroupsPage.tsx
import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetailForMentor } from "@/lib/api/redux/councilReviewSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { groupColumns } from "./columns";
import Header from "@/components/header";

export const CouncilReviewGroupsPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilReview);

  // Hàm refetch dữ liệu
  const handleRefetch = useCallback(() => {
    if (councilId && semesterId) {
      dispatch(fetchCouncilDetailForMentor({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId]);

  // Fetch dữ liệu nếu chưa có
  useEffect(() => {
    if (councilId && semesterId && !councilDetail) {
      dispatch(fetchCouncilDetailForMentor({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId, councilDetail]);

  const table = useReactTable({
    data: councilDetail?.sessions || [],
    columns: groupColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      refetchData: handleRefetch, // Truyền refetchData vào meta
    },
  });

  if (!councilId || !semesterId) {
    return <p className="text-center text-red-500">Council ID hoặc Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Thông tin nhóm review"
        href="/review-topic-council"
        currentPage="Quản lý hội đồng"
      />
      <div className="p-6 flex-1 overflow-auto">
        {loadingDetail ? (
          <p className="text-center text-gray-500">Đang tải thông tin nhóm...</p>
        ) : !councilDetail ? (
          <p className="text-center text-gray-500">Không có dữ liệu hội đồng!</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};