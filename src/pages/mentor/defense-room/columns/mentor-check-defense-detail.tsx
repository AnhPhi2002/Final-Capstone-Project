import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchDefenseSchedulesForMentor } from "@/lib/api/redux/councilDefenseSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MentorCheckDefense: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviewSchedulesMentor, loadingSchedulesMentor, errorSchedulesMentor } = useSelector(
    (state: RootState) => state.councilDefense
  );
  const { semesterId } = useParams<{ semesterId?: string }>();
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchDefenseSchedulesForMentor({ semesterId }));
    }
  }, [dispatch, semesterId]);

  // Extract unique group codes
  const uniqueGroupCodes = Array.from(
    new Set(reviewSchedulesMentor?.map((item) => item.group.groupCode) || [])
  );

  // Configure table with filter
  const table = useReactTable<DefenseSchedule>({
    data: reviewSchedulesMentor || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: selectedGroup === "all" ? "" : selectedGroup,
    },
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!filterValue) return true;
      return row.original.group.groupCode === filterValue;
    },
  });

  if (!semesterId) {
    return <p className="text-center text-red-500">Semester ID không hợp lệ!</p>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Lịch bảo vệ nhóm"
        href="/lecturer-dashboard"
        currentPage="Phòng bảo vệ"
      />
      <div className="p-6 flex-1 overflow-auto">
        <div className="mb-4">
          <Select
            value={selectedGroup}
            onValueChange={(value) => setSelectedGroup(value)}
            disabled={loadingSchedulesMentor || uniqueGroupCodes.length === 0}
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue
                placeholder={
                  uniqueGroupCodes.length === 0 ? "Không có nhóm" : "Lọc theo nhóm"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nhóm</SelectLabel>
                <SelectItem value="all">Tất cả nhóm</SelectItem>
                {uniqueGroupCodes.map((groupCode) => (
                  <SelectItem key={groupCode} value={groupCode}>
                    {groupCode}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {loadingSchedulesMentor ? (
          <p className="text-center text-gray-500">Đang tải lịch bảo vệ...</p>
        ) : errorSchedulesMentor ? (
          <p className="text-center text-red-500">{errorSchedulesMentor}</p>
        ) : !reviewSchedulesMentor || reviewSchedulesMentor.length === 0 ? (
          <p className="text-center text-gray-500">Không có lịch bảo vệ nào.</p>
        ) : (
          <DataTable table={table} />
        )}
      </div>
    </div>
  );
};