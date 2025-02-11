import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters } from "@/lib/api/redux/semesterSlice";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/api/redux/store";
// import { fetchYears } from "@/lib/api/redux/yearSlice";
// import { fetchSemesters } from "@/lib/api/redux/semesterSlice";

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

  const { years, loading: yearLoading } = useSelector(
    (state: RootState) => state.years
  );
  const { semesters, loading: semesterLoading } = useSelector(
    (state: RootState) => state.semesters
  );

  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  // Fetch Years on mount
  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  // Fetch Semesters when selectedYear changes
  useEffect(() => {
    dispatch(fetchSemesters(selectedYear)); // Nếu selectedYear === "all", lấy tất cả semesters
  }, [selectedYear, dispatch]);

  // Lọc danh sách semesters theo year nếu chọn năm cụ thể
  const filteredSemesters =
    selectedYear === "all"
      ? semesters
      : semesters.filter((s) => s.yearId === selectedYear);

  // Lọc theo kỳ học nếu chọn cụ thể
  const cardData =
    selectedSemester === "all"
      ? filteredSemesters.map((semester) => ({
          id: semester.id,
          code: semester.code,
          year: semester.year,
          start_date: semester.semester_detail[0]?.start_date,
          end_date: semester.semester_detail[0]?.end_date,
        }))
      : filteredSemesters
          .filter((semester) => semester.code === selectedSemester)
          .map((semester) => ({
            id: semester.id,
            code: semester.code,
            year: semester.year,
            start_date: semester.semester_detail[0]?.start_date,
            end_date: semester.semester_detail[0]?.end_date,
          }));

  const isFiltered = selectedYear !== "all" || selectedSemester !== "all";

  return (
    <div className="space-y-4">
      {/* Dropdown năm học */}
      <div className="flex items-center space-x-4">
        <Select onValueChange={(value) => handleYearChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              <SelectItem value="all">All Years</SelectItem>
              {yearLoading ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
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

        {/* Dropdown kỳ học */}
        <Select
          onValueChange={(value) => setSelectedSemester(value)}
          disabled={filteredSemesters.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Semesters</SelectLabel>
              <SelectItem value="all">All Semesters</SelectItem>
              {semesterLoading ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
              ) : (
                filteredSemesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.code}>
                    {semester.code}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 pt-10">
        {isFiltered && cardData.length > 0 && <CardSemester data={cardData} />}
      </div>
    </div>
  );
};

