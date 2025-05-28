import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters, clearSemesters } from "@/lib/api/redux/semesterSlice";
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
  const navigate = useNavigate();

  const { data: years, loading: loadingYears } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: loadingSemesters } = useSelector((state: RootState) => state.semesters);

  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
    } else {
      dispatch(clearSemesters());
    }
  }, [selectedYear, dispatch]);

  const handleSemesterClick = (semesterId: string) => {
    navigate(`/admin/user/${semesterId}`);
  };

  const filteredYears = years.filter((y) => !y.isDeleted);
  const filteredSemesters = semesters.filter((s) => !s.isDeleted);

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
                <SelectItem value="loading" disabled>
                  Đang tải...
                </SelectItem>
              ) : filteredYears.length > 0 ? (
                filteredYears.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  Không có năm học
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedYear && (
        <CardSemester
          selectedSemester=""
          data={filteredSemesters}
          loading={loadingSemesters}
          onCardClick={handleSemesterClick}
        />
      )}
    </div>
  );
};