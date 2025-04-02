import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilDefenseSlice"; // Sửa thành councilReviewSlice
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { memberColumns } from "./columns";
import Header from "@/components/header";
import { AddMemberReviewCouncil } from "./add-council-member";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const CouncilDefenseMembersPage: React.FC = () => {
  const { councilId, semesterId } = useParams<{
    councilId?: string;
    semesterId?: string;
  }>(); // Cho phép undefined
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector(
    (state: RootState) => state.councilReview
  ); // Sửa thành councilReviews nếu dùng key này trong store
  const [openAddMember, setOpenAddMember] = useState(false);

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

  const table = useReactTable({
    data: councilDetail?.members || [],
    columns: memberColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Kiểm tra councilId và semesterId có hợp lệ không
  if (!councilId || !semesterId) {
    return (
      <p className="text-center text-red-500">
        Council ID hoặc Semester ID không hợp lệ!
      </p>
    );
  }
  const handleBack = () => {
    window.history.back(); // hoặc navigate nếu bạn dùng React Router
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Chi tiết hội đồng kiểm tra đồ án"
        href="/examination/council-review-member"
        currentPage="Thành viên  hội đồng kiểm tra đồ án"
      />
      <div className="p-5 flex-1 overflow-auto">
        <div className="mb-5 flex justify-between items-center">
          {/* Nút quay lại bên trái */}
          <Button onClick={handleBack}>
            <ArrowLeft /> Quay lại
          </Button>

          {/* Nút thêm thành viên bên phải */}
          <Button
            className="bg-black text-white"
            onClick={() => setOpenAddMember(true)}
            disabled={loadingDetail}
          >
            Thêm thành viên
          </Button>
        </div>

        {/* Tích hợp AddMemberReviewCouncil */}
        <AddMemberReviewCouncil
          open={openAddMember}
          setOpen={setOpenAddMember}
          councilId={councilId}
          semesterId={semesterId}
        />

        {loadingDetail ? (
          <p className="text-center text-gray-500">
            Đang tải danh sách thành viên...
          </p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};
