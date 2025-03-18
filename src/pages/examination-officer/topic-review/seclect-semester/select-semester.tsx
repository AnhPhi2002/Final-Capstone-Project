import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters, clearSemesters } from "@/lib/api/redux/semesterSlice";
import {
  fetchSubmissionRounds,
  clearSubmissionRounds,
} from "@/lib/api/redux/submissionRoundSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardSemester } from "./card-semester";

export const SelectSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy danh sách năm học, kỳ học, vòng nộp từ Redux
  const { data: years, loading: loadingYears } = useSelector(
    (state: RootState) => state.years
  );
  const { data: semesters, loading: loadingSemesters } = useSelector(
    (state: RootState) => state.semesters
  );
  const { data: submissionRounds, loading: loadingRounds } = useSelector(
    (state: RootState) => state.submissionRounds
  );

  // State lưu năm học và học kỳ được chọn
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  // Fetch danh sách năm học khi component mount
  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  // Fetch danh sách kỳ học khi chọn năm học
  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
      setSelectedSemester(""); // Reset học kỳ khi chọn năm mới
      dispatch(clearSubmissionRounds());
    } else {
      dispatch(clearSemesters());
      dispatch(clearSubmissionRounds());
    }
  }, [selectedYear, dispatch]);

  // Fetch danh sách vòng nộp khi chọn kỳ học
  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchSubmissionRounds(selectedSemester));
    } else {
      dispatch(clearSubmissionRounds());
    }
  }, [selectedSemester, dispatch]);

  return (
    <div className="space-y-4">
      {/* Bộ lọc */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        {/* Select chọn năm học */}
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn năm học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm học</SelectLabel>
              {loadingYears ? (
                <SelectItem value="loading" disabled>
                  Đang tải...
                </SelectItem>
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

        {/* Select chọn kỳ học */}
        <Select
          onValueChange={setSelectedSemester}
          value={selectedSemester}
          disabled={!selectedYear}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              {loadingSemesters ? (
                <SelectItem value="loading" disabled>
                  Đang tải...
                </SelectItem>
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

      {/* Hiển thị CardSemester khi chọn học kỳ */}
      {selectedSemester && (
        <CardSemester
          data={submissionRounds}
          loading={loadingRounds}
          selectedSemester={selectedSemester}
        />
      )}
    </div>
  );
};