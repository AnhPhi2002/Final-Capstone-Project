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
    dispatch(fetchAllYears()); // Lấy danh sách năm học
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear })); // Lấy tất cả học kỳ theo năm học (không có phân trang)
    }
  }, [dispatch, selectedYear]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value); // Cập nhật năm học được chọn
  };

  if (!Array.isArray(years)) {
    console.error("Years is not an array:", years);
    return <p>Không tải được danh sách năm học...</p>;
  }

  // Lọc các semester có isDeleted là false
  const filteredYears = years.filter((year) => year.isDeleted === false);
  const filteredSemesters = semesters.filter((semester) => semester.isDeleted === false);

  // Dữ liệu truyền vào CardSemester chỉ chứa các semester chưa bị xóa
  const cardData = filteredSemesters;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Select onValueChange={(value) => handleYearChange(value)}>
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
              ) : (
                filteredYears.map((year) => (
                  <SelectItem key={year.id} value={year.id}>
                    {year.year}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedYear && <CardSemester data={cardData} />}
    </div>
  );
};