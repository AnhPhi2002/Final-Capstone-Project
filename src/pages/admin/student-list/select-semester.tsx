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
  const { data: semesters, loading: semesterLoading } = useSelector((state: RootState) => state.semesters);

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



  if (!Array.isArray(years)) {
    console.error("Years is not an array:", years);
    return <p>Loading years failed...</p>;
  }

  const cardData = semesters; 

  return (
    <div className="space-y-4">

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Select onValueChange={(value) => handleYearChange(value)}>
          <SelectTrigger className="w-[200px]">
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
       {selectedYear && <CardSemester data={cardData} />}
    </div>
  );
};
