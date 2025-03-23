// components/CouncilReviewDetail.tsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilReviewSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { CouncilReviewMember } from "@/lib/api/types";
import { DataTable } from "./data-table";
import { memberColumns } from "./columns";
import { AddMemberReviewCouncil } from "./AddMemberReviewCouncil";
import { CreateReviewSchedule } from "./CreateReviewSchedule";
import Header from "@/components/header";

export const CouncilReviewDetail = () => {
  const { councilId } = useParams<{ councilId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilReview); // Bỏ error
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useEffect(() => {
    if (councilId) {
      dispatch(fetchCouncilDetail(councilId));
    }
  }, [dispatch, councilId]);

  const tableData = useMemo(() => {
    console.log("Memoizing tableData with councilDetail.members:", councilDetail?.members);
    return (councilDetail?.members || []) as CouncilReviewMember[];
  }, [councilDetail]);

  const table = useReactTable<CouncilReviewMember>({
    data: tableData,
    columns: memberColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      {loadingDetail ? (
        <p className="text-center text-gray-500">Đang tải thông tin hội đồng...</p>
      ) : !councilDetail ? (
        <p className="text-center text-gray-500">Không tìm thấy thông tin hội đồng.</p>
      ) : (
        <>
          <Header
            title={`Chi tiết hội đồng: ${councilDetail.name}`}
            href="/council-review"
            currentPage="Quản lý hội đồng"
          />
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex justify-end mb-4 space-x-4">
              <button
                onClick={() => setAddMemberOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Thêm thành viên
              </button>
              <button
                onClick={() => setScheduleOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Tạo lịch review
              </button>
            </div>
            <DataTable table={table} />
            <AddMemberReviewCouncil
              open={addMemberOpen}
              setOpen={setAddMemberOpen}
              councilId={councilId!}
              semesterId={councilDetail.semesterId}
            />
            <CreateReviewSchedule
              open={scheduleOpen}
              setOpen={setScheduleOpen}
              councilId={councilId!}
              semesterId={councilDetail.semesterId}
            />
          </div>
        </>
      )}
    </div>
  );
};