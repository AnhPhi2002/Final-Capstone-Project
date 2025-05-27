// src/components/council-defense-mentor-detail.tsx
import { useEffect, useMemo, useCallback, useState } from "react";
import { CouncilDefense } from "@/lib/api/redux/types/defenseSchedule";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDefenseDetailForMentor } from "@/lib/api/redux/councilDefenseSlice"; 
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { columnsCouncils } from "./columns";
import Header from "@/components/header";

export const CouncilDefenseMentorDetail = () => {
  const { councilId, semesterId } = useParams<{ councilId?: string; semesterId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector((state: RootState) => state.councilDefense);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if (councilId && semesterId) {
      dispatch(fetchCouncilDefenseDetailForMentor({ councilId, semesterId }));
    }
  }, [dispatch, councilId, semesterId]);

  useEffect(() => {
    if (shouldRefetch && councilId && semesterId) {
      dispatch(fetchCouncilDefenseDetailForMentor({ councilId, semesterId }));
      setShouldRefetch(false);
    }
  }, [shouldRefetch, dispatch, councilId, semesterId]);

  const handleRefetch = useCallback(() => {
    setShouldRefetch(true);
  }, []);

  const tableData = useMemo(() => {
    console.log("Memoizing tableData with councilDetail:", councilDetail);
    return councilDetail ? [councilDetail] : [];
  }, [councilDetail]);

  const table = useReactTable<CouncilDefense>({
    data: tableData,
    columns: columnsCouncils,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      refetchData: handleRefetch,
    },
  });

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
            title="Chi tiết hội đồng bảo vệ"
            href="/lecturer/check-defense"
            currentPage="Hội đồng bảo vệ"
          />
          <div className="p-6 flex-1 overflow-auto">
            <DataTable table={table} />
          </div>
        </>
      )}
    </div>
  );
};