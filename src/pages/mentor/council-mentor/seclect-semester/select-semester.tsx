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
  fetchReviewCouncilsList,
  clearCouncils,
} from "@/lib/api/redux/councilReviewSlice";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardCouncil } from "./card-council";

export const SelectSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: years, loading: loadingYears } = useSelector(
    (state: RootState) => state.years
  );
  const { data: semesters, loading: loadingSemesters } = useSelector(
    (state: RootState) => state.semesters
  );
  const { data: submissionRounds, loading: loadingRounds } = useSelector(
    (state: RootState) => state.submissionRounds
  );
  const { data: councils } = useSelector(
    (state: RootState) => state.councilReview
  );

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubmissionRound, setSelectedSubmissionRound] = useState("");

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
      setSelectedSemester("");
      setSelectedSubmissionRound("");
      dispatch(clearCouncils());
      dispatch(clearSubmissionRounds());
    } else {
      dispatch(clearSemesters());
      dispatch(clearCouncils());
      dispatch(clearSubmissionRounds());
    }
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchSubmissionRounds(selectedSemester));
      setSelectedSubmissionRound("");
      dispatch(clearCouncils());
    } else {
      dispatch(clearSubmissionRounds());
      dispatch(clearCouncils());
    }
  }, [selectedSemester, dispatch]);

  useEffect(() => {
    if (selectedSemester && selectedSubmissionRound) {
      dispatch(fetchReviewCouncilsList({
        semesterId: selectedSemester,
        submissionPeriodId: selectedSubmissionRound,
      }));
    }
  }, [selectedSemester, selectedSubmissionRound, dispatch]);

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted);
  const availableRounds = submissionRounds.filter((r) => !r.isDeleted && r.type === "REVIEW");

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
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : availableSemesters.length > 0 ? (
                availableSemesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.code}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có kỳ học</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select vòng nộp */}
        <Select
          onValueChange={setSelectedSubmissionRound}
          value={selectedSubmissionRound}
          disabled={!selectedSemester}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn đợt kiểm tra" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Đợt kiểm tra</SelectLabel>
              {loadingRounds ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : availableRounds.length > 0 ? (
                availableRounds.map((round) => (
                  <SelectItem key={round.id} value={round.id}>
                    {round.description}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có vòng nộp</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedSubmissionRound && selectedSemester && (
        <CardCouncil
          councils={councils}
          semesterId={selectedSemester}
        />
      )}
    </div>
  );
};
