import React, { useEffect } from "react";
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

type SelectSemesterProps = {
  selectedYear: string;
  selectedSemester: string;
  onYearChange: (yearId: string) => void;
  onSemesterChange: (semesterId: string) => void;
};

export const SelectSemester: React.FC<SelectSemesterProps> = ({
  selectedYear,
 
  onYearChange,

}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: years, loading: yearLoading } = useSelector((state: RootState) => state.years);
  const { data: semesters } = useSelector((state: RootState) => state.semesters);

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedYear) {
      dispatch(fetchSemesters({ yearId: selectedYear }));
    }
  }, [dispatch, selectedYear]);

  if (!Array.isArray(years)) {
    console.error("Years is not an array:", years);
    return <p>Không tải được danh sách năm học...</p>;
  }

  const cardData = semesters.filter((s) => !s.isDeleted);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        <Select onValueChange={onYearChange} value={selectedYear || undefined}>
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
                years
                  .filter((year) => !year.isDeleted)
                  .map((year) => (
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