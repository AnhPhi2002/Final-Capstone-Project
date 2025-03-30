import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters, clearSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchSubmissionRounds, clearSubmissionRounds } from "@/lib/api/redux/submissionRoundSlice";
import { fetchReviewCouncilsList, clearCouncils } from "@/lib/api/redux/councilReviewSlice";

import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue
} from "@/components/ui/select";

import { CardCouncil } from "./card-council";

export const SelectSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: years, loading: loadingYears } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: loadingSemesters } = useSelector((state: RootState) => state.semesters);
  const { data: submissionRounds, loading: loadingRounds } = useSelector((state: RootState) => state.submissionRounds);
  const { data: councils } = useSelector((state: RootState) => state.councilReview);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubmissionRound, setSelectedSubmissionRound] = useState<string>("");

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted);
  const availableRounds = submissionRounds.filter((r) => !r.isDeleted && r.type === "REVIEW" && !r.isDeleted);

  const sortedSemesters = availableSemesters.sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
      setSelectedSemester("");
      dispatch(clearSubmissionRounds());
      dispatch(clearCouncils());
    } else {
      dispatch(clearSemesters());
      dispatch(clearSubmissionRounds());
      dispatch(clearCouncils());
    }
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchSubmissionRounds(selectedSemester));
      dispatch(clearCouncils());
    }
  }, [selectedSemester, dispatch]);

  useEffect(() => {
    if (selectedSubmissionRound) {
      dispatch(fetchReviewCouncilsList({ semesterId: selectedSemester, submissionPeriodId: selectedSubmissionRound }));
    } else {
      dispatch(clearCouncils());
    }
  }, [selectedSubmissionRound, dispatch, selectedSemester]);

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
                  <SelectItem key={year.id} value={year.id}>{year.year}</SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có năm học</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select học kỳ */}
        <Select onValueChange={setSelectedSemester} value={selectedSemester} disabled={!selectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Học kỳ</SelectLabel>
              {loadingSemesters ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : sortedSemesters.length > 0 ? (
                sortedSemesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>{semester.code}</SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có học kỳ</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select vòng nộp (REVIEW) */}
        <Select
          onValueChange={setSelectedSubmissionRound}
          value={selectedSubmissionRound}
          disabled={!selectedSemester}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Chọn vòng REVIEW" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vòng REVIEW</SelectLabel>
              {loadingRounds ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : availableRounds.length > 0 ? (
                availableRounds.map((round) => (
                  <SelectItem key={round.id} value={round.id}>
                    Lần {round.roundNumber} - {round.description}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>Không có vòng REVIEW</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedSubmissionRound && (
        <CardCouncil councils={councils} semesterId={selectedSemester} />
      )}
    </div>
  );
};
