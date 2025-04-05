import { useEffect, useMemo, useCallback, useState } from "react";
import { Council } from "@/lib/api/types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetailForLecturer } from "@/lib/api/redux/councilSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { columnsCouncils } from "./columns";
import Header from "@/components/header";

export const CouncilCheckTopicDetail = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councils);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  // Fetch chi tiết hội đồng khi component mount hoặc councilId thay đổi
  useEffect(() => {
    if (councilId && semesterId) {
      dispatch(fetchCouncilDetailForLecturer({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId]);

  // Kiểm soát refetch khi cần
  useEffect(() => {
    if (shouldRefetch && councilId && semesterId) {
      dispatch(fetchCouncilDetailForLecturer({ councilId, semesterId }));
      setShouldRefetch(false);
    }
  }, [shouldRefetch, dispatch, councilId, semesterId]);

  const handleRefetch = useCallback(() => {
    setShouldRefetch(true);
  }, []);

  // Memoize dữ liệu đầu vào cho bảng
  const tableData = useMemo(() => {
    console.log("Memoizing tableData with councilDetail:", councilDetail);
    return councilDetail ? [councilDetail.council] : []; // Chỉ lấy phần council từ councilDetail
  }, [councilDetail]);

  // Gọi useReactTable ở top level
  const table = useReactTable<Council>({
    data: tableData,
    columns: columnsCouncils,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      refetchData: handleRefetch,
    },
  });

  // Kiểm tra councilId và semesterId có hợp lệ không
  if (!councilId || !semesterId) {
    return <p className="text-center text-red-500">Council ID hoặc Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      {loadingDetail ? (
        <p className="text-center text-gray-500">Đang tải thông tin hội đồng...</p>
      ) : (
        <>
          <Header
            title="Chi tiết hội đồng xét duyệt"
            href="/review-topic"
            currentPage="Quản lý hội đồng"
          />
          <div className="p-6 flex-1 overflow-auto">
            <DataTable table={table} />
          </div>
        </>
      )}
    </div>
  );
};