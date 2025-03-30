import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicRegistrations } from "@/lib/api/redux/topicSlice";
import { ApproveTopic } from "@/lib/api/types"; // 🔹 Đảm bảo import đúng
import Header from "@/components/header";
import { ToolPanel } from "./tool-panel";
import { DataTable } from "./data-table";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { columnsApproveTopic } from "./columns";

export const ApproveTopicDetail = () => {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { topicRegistrations, loading, error } = useSelector(
    (state: RootState) => state.topics
  );

  useEffect(() => {
    if (topicId && semesterId) {
      dispatch(fetchTopicRegistrations({ topicId, semesterId }));
    }
  }, [dispatch, topicId, semesterId]);

  const table = useReactTable<ApproveTopic>({
    data: topicRegistrations || [],
    columns: columnsApproveTopic,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết hội đồng xét duyệt" href="/review-topic" currentPage="Quản lý giảng viên" />
      <div className="p-6 flex-1 overflow-auto">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải danh sách...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* <ToolPanel table={table} /> */}
            <DataTable table={table} />
          </>
        )}
      </div>
    </div>
  );
};
