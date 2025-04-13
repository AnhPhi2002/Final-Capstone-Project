import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilSlice";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { columnsCouncilMembers } from "./columns";
import Header from "@/components/header";
import { ToolPanel } from "./tool-panel";

export const CouncilMembersPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>(); // Lấy semesterId từ params
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councils);

  const refetchData = () => {
    if (councilId) {
      dispatch(fetchCouncilDetail(councilId));
    }
  };

  useEffect(() => {
    if (councilId) {
      refetchData();
    }
  }, [councilId, dispatch]);

  // Kiểm tra councilId và semesterId hợp lệ
  if (!councilId || !semesterId) {
    return (
      <p className="text-center text-red-500">
        Council ID hoặc Semester ID không hợp lệ!
      </p>
    );
  }

  const table = useReactTable({
    data: councilDetail?.council.members || [],
    columns: columnsCouncilMembers,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title="Thành viên hội đồng" href="/review-topic-council" currentPage="Quản lý hội đồng" />
      <div className="p-6 flex-1 overflow-auto">
        <ToolPanel
          table={table}
          councilId={councilId}
          refetchData={refetchData}
          semesterId={semesterId} // Truyền semesterId từ params
        />
        {loadingDetail ? (
          <p className="text-center text-gray-500">Đang tải danh sách thành viên...</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};