import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetailForMentor } from "@/lib/api/redux/councilReviewSlice"; // Thay fetchCouncilDetail
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { memberColumns } from "./columns";
import Header from "@/components/header";

export const CouncilCheckMembersPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilReview);

  // Fetch dữ liệu nếu chưa có (trường hợp vào thẳng trang này)
  useEffect(() => {
    if (councilId && semesterId && !councilDetail) {
      dispatch(fetchCouncilDetailForMentor({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId, councilDetail]);

  const table = useReactTable({
    data: councilDetail?.members || [], // Dùng trực tiếp members từ councilDetail
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
        title="Thành viên hội đồng"
        href="/review-topic-council"
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