import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters, clearSemesters } from "@/lib/api/redux/semesterSlice";
import {
  fetchSubmissionRounds,
  clearSubmissionRoundDetail,
} from "@/lib/api/redux/submissionRoundSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardDeadlineTopic } from "./card-deadline-topic";

export const SelectSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: years, loading: loadingYears } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: loadingSemesters } = useSelector((state: RootState) => state.semesters);
  const { data: submissionRounds, loading: loadingRounds } = useSelector((state: RootState) => state.submissionRounds);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted);
  const sortedSemesters = availableSemesters.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
      setSelectedSemester("all");
      dispatch(clearSubmissionRoundDetail());
    } else {
      dispatch(clearSemesters());
      dispatch(clearSubmissionRoundDetail());
    }
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester !== "all") {
      dispatch(fetchSubmissionRounds(selectedSemester));
    } else {
      dispatch(clearSubmissionRoundDetail());
    }
  }, [selectedSemester, dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        {/* Select năm học */}
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn năm học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm học</SelectLabel>
              {loadingYears ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : availableYears.length > 0 ? (
                availableYears.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có năm học</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select kỳ học */}
        <Select onValueChange={setSelectedSemester} value={selectedSemester} disabled={!selectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              <SelectItem value="all">Chưa chọn kỳ</SelectItem>
              {loadingSemesters ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : sortedSemesters.length > 0 ? (
                sortedSemesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.code}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có học kỳ</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <CardDeadlineTopic
        data={submissionRounds.filter((r) => !r.isDeleted)}
        loading={loadingRounds}
        selectedSemester={selectedSemester}
      />
    </div>
  );
};
