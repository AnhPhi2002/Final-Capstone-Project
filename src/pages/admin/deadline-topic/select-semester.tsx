import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters, clearSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchSubmissionRounds, clearSubmissionRoundDetail } from "@/lib/api/redux/submissionRoundSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";

import { CardDeadlineTopic } from "./card-deadline-topic";
import { DataTable } from "@/pages/admin/deadline-topic/columns/data-table";
import { columns } from "@/pages/admin/deadline-topic/columns/columns";
import { Button } from "@/components/ui/button";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: years, loading: loadingYears } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: loadingSemesters } = useSelector((state: RootState) => state.semesters);
  const { data: submissionRounds, roundDetail, loading: loadingRounds } = useSelector((state: RootState) => state.submissionRounds);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  // Fetch danh sách năm học khi component mount
  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  // Khi chọn năm học -> Fetch danh sách kỳ học theo năm đó
  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
      setSelectedSemester("all");
      dispatch(clearSubmissionRoundDetail());
    } else {
      dispatch(clearSemesters());
      dispatch(clearSubmissionRoundDetail());
    }
  }, [dispatch, selectedYear]);

  // Khi chọn kỳ học -> Fetch danh sách vòng nộp theo kỳ đó
  useEffect(() => {
    if (selectedSemester !== "all") {
      dispatch(fetchSubmissionRounds(selectedSemester));
    } else {
      dispatch(clearSubmissionRoundDetail());
    }
  }, [dispatch, selectedSemester]);

  // ✅ Nếu có Round mới vừa được tạo -> Cập nhật selectedYear và selectedSemester
  useEffect(() => {
    if (roundDetail) {
      dispatch(fetchYears()); // Fetch lại danh sách năm học
      dispatch(fetchSemesters({ yearId: roundDetail.semesterId })); // Fetch lại danh sách kỳ học
      dispatch(fetchSubmissionRounds(roundDetail.semesterId)); // Fetch lại danh sách vòng nộp

      // Tìm kỳ học tương ứng với vòng nộp mới
      const semester = semesters.find((s) => s.id === roundDetail.semesterId);
      if (semester) {
        setSelectedYear(semester.yearId || ""); // ✅ Set lại năm học
        setSelectedSemester(semester.id); // ✅ Set lại kỳ học
      }
    }
  }, [roundDetail, semesters, dispatch]);

  // Tạo bảng dữ liệu khi có `roundDetail`
  const table = useReactTable({
    data: roundDetail ? [roundDetail] : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        {/* Chọn năm học */}
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn năm học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm học</SelectLabel>
              {loadingYears ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : (
                years.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Chọn kỳ học */}
        <Select onValueChange={setSelectedSemester} value={selectedSemester} disabled={!selectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              <SelectItem value="all">Chọn học kỳ</SelectItem>
              {loadingSemesters ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : (
                semesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.code}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Nếu có roundDetail, hiển thị DataTable */}
      {roundDetail ? (
        <div>
          <Button onClick={() => dispatch(clearSubmissionRoundDetail())}>Quay lại</Button>
          <DataTable table={table} />
        </div>
      ) : (
        <>
          {loadingRounds ? (
            <p className="text-center text-gray-500">Đang tải vòng nộp...</p>
          ) : submissionRounds.length > 0 ? (
            <CardDeadlineTopic data={submissionRounds} />
          ) : (
            <p className="text-center text-gray-500">Chưa có vòng nộp nào cho kỳ học này.</p>
          )}
        </>
      )}
    </div>
  );
};
