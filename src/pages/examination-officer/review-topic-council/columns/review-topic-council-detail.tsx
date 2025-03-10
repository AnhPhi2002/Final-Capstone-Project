import { useEffect } from "react";
import { Council } from "@/lib/api/types"; // Adjust the import path as necessary
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilSlice";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { columnsCouncils } from "./columns";
import Header from "@/components/header";
// import { ToolPanel } from "./tool-panel";

export const ReviewTopicCouncilDetail = () => {
  const { councilId } = useParams<{ councilId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {councilDetail, loadingDetail} = useSelector((state: RootState) => state.councils)

  useEffect(() => {
    if (councilId) {
      dispatch(fetchCouncilDetail(councilId));
    }
  }, [dispatch, councilId]);


  const table = useReactTable <Council>({
    data: councilDetail ? [councilDetail] : [],
    columns: columnsCouncils,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loadingDetail) {
    return <p className="text-center text-gray-500">Đang tải thông tin hội đồng...</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết hội đồng xét duyệt" href="/review-topic" currentPage="Quản lý hội đồng" />
      <div className="p-6 flex-1 overflow-auto">
          <DataTable table={table} />
      </div>
    </div>
  );
};
