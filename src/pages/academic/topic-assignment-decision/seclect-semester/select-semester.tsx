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
  const { data: years, loading: loadingYears } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: loadingSemesters } = useSelector((state: RootState) => state.semesters);
  const { data: submissionRounds, loading: loadingRounds } = useSelector((state: RootState) => state.submissionRounds);

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
      dispatch(clearSubmissionRounds());
    } else {
      dispatch(clearSemesters());
      dispatch(clearSubmissionRounds());
    }
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchSubmissionRounds(selectedSemester));
      setSelectedSubmissionRound("");
    } else {
      dispatch(clearSubmissionRounds());
    }
  }, [selectedSemester, dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
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
                years.filter((y) => !y.isDeleted).map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

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
              ) : (
                semesters.filter((s) => !s.isDeleted).map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.code}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={setSelectedSubmissionRound}
          value={selectedSubmissionRound}
          disabled={!selectedSemester}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn vòng nộp" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vòng nộp</SelectLabel>
              {loadingRounds ? (
                <SelectItem value="loading" disabled>Đang tải...</SelectItem>
              ) : (
                submissionRounds
                  .filter((round) => !round.isDeleted && round.type === "TOPIC")
                  .map((round) => (
                    <SelectItem key={round.id} value={round.id}>
                      {round.description}
                    </SelectItem>
                  ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedSubmissionRound && (
        <CardSemester
          data={semesters}
          submissionRounds={submissionRounds}
          selectedRoundId={selectedSubmissionRound}
        />
      )}
    </div>
  );
};
