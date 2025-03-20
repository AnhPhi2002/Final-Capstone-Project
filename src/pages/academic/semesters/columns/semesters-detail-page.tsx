import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import { Semester } from "@/lib/api/types";

export function SemestersDetailPage() {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { semesterDetail, loading, error } = useSelector(
    (state: RootState) => state.semesters
  );

  const refetchSemesterDetail = () => {
    if (semesterId) {
      dispatch(fetchSemesterDetail(semesterId));
    }
  };

  React.useEffect(() => {
    refetchSemesterDetail();
  }, [semesterId]);

  const table = useReactTable<Semester>({
    data: semesterDetail ? [semesterDetail] : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      refetchData: refetchSemesterDetail, // Pass refetch function through table meta
    },
  });


  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Loading..." href="/semester" currentPage="Semester Detail" />
        <div className="p-5">Loading semester details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Error" href="/semester" currentPage="Semester Detail" />
        <div className="p-5">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title={`Semester: ${semesterDetail?.code}`} href="/semester" currentPage="Semester Detail" />
      <div className="p-5 flex-1 overflow-auto">
        <DataTable table={table} />
      </div>
    </div>
  );
}
