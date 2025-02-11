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
import { Button } from "@/components/ui/button";

export const SelectSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: years, loading: yearLoading } = useSelector((state: RootState) => state.years);
  const { data: semesters, loading: semesterLoading, currentPage, totalPages } = useSelector((state: RootState) => state.semesters);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllYears()); 
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear, page, pageSize: 2 }));
    }
  }, [dispatch, selectedYear, page]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    setPage(1); // Reset về trang 1 khi đổi năm học
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (!Array.isArray(years)) {
    console.error("Years is not an array:", years);
    return <p>Loading years failed...</p>;
  }

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
      </div>

      {/* Danh sách semesters */}
      <div className="mt-4">
        {semesterLoading ? (
          <p>Đang tải danh sách kỳ học...</p>
        ) : (
          <CardSemester data={semesters} />
        )}

        {/* Nút phân trang */}
        {semesters.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <Button onClick={handlePreviousPage} disabled={page === 1}>
              Trang trước
            </Button>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={page === totalPages}>
              Trang tiếp theo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
