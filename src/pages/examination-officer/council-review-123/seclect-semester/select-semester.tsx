import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters, clearSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchReviewCouncilsList, clearCouncils } from "@/lib/api/redux/councilReviewSlice";
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
  const { data: councils } = useSelector(
    (state: RootState) => state.councilReview
  );

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
      setSelectedSemester("");
      dispatch(clearCouncils());
    } else {
      dispatch(clearSemesters());
      dispatch(clearCouncils());
    }
  }, [selectedYear, dispatch]);

  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchReviewCouncilsList({ semesterId: selectedSemester }));
    } else {
      dispatch(clearCouncils());
    }
  }, [selectedSemester, dispatch]);

  const availableYears = years.filter((y) => !y.isDeleted);
  const availableSemesters = semesters.filter((s) => !s.isDeleted);

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
      </div>

      {selectedSemester && (
        <CardCouncil councils={councils} semesterId={selectedSemester} />
      )}
    </div>
  );
};