import React, { useState } from "react";
import semesterData from "@/data/students.json"; // Đảm bảo đúng đường dẫn JSON
import { CardSemester } from "./card-semester";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectSemester: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const years = [
    ...new Set(semesterData.map((yearData) => yearData.year.toString())),
  ];


  const selectedYearData = semesterData.find(
    (yearData) => yearData.year.toString() === selectedYear
  );

  const semesters = selectedYearData ? selectedYearData.semesters : [];


  const cardData = semesters
    .filter(
      (semester) => !selectedSemester || semester.code === selectedSemester
    )
    .map((semester) => ({
      id: semester.code,
      code: semester.code,
      year: selectedYear!,
      start_date: semester.start_date,
      end_date: semester.end_date,
      students: semester.students || [], 
    }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-full md:w-[200px]">
          <Select onValueChange={(value) => setSelectedYear(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn năm học" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-[200px]">
          <Select onValueChange={(value) => setSelectedSemester(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn học kỳ" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester.code} value={semester.code}>
                  {semester.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedYear && <CardSemester data={cardData} />}
    </div>
  );
};
