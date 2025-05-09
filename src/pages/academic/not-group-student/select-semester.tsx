import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchAllYears } from "@/lib/api/redux/yearSlice";
import { fetchSemesters } from "@/lib/api/redux/semesterSlice";
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

  const { data: years, loading: yearLoading } = useSelector((state: RootState) => state.years);
  const { data: semesters } = useSelector((state: RootState) => state.semesters);

  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
    }
  }, [dispatch, selectedYear]);

  // Lọc năm học chưa bị xóa
  const availableYears = years.filter((year) => !year.isDeleted);

  // Lọc học kỳ chưa bị xóa
  const activeSemesters = semesters.filter((s) => !s.isDeleted);
  const sortedSemesters = activeSemesters.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn năm học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm học</SelectLabel>
              {yearLoading ? (
                <SelectItem value="loading" disabled>
                  Đang tải...
                </SelectItem>
              ) : availableYears.length > 0 ? (
                availableYears.map((year) => (
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

      {selectedYear && <CardSemester data={sortedSemesters} />}
    </div>
  );
};
