import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import councilData from "@/data/council-member.json";
import { CardSemester } from "./card-semester";
import { AcademicYearCouncil } from "@/types/council-member";

export const SelectSemester: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  const academicData: AcademicYearCouncil = councilData;
  const years = [...new Set(academicData.map((semester) => semester.year))];

  const filteredSemesters =
    selectedYear === ""
      ? []
      : academicData.filter((semester) => semester.year === selectedYear);

  const filteredBySemester =
    selectedSemester === "all"
      ? filteredSemesters
      : filteredSemesters.filter(
          (semester) => semester.code === selectedSemester
        );

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedSemester("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={handleYearChange} value={selectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn năm học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm học</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedSemester} value={selectedSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn kỳ học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              <SelectItem value="all">Chọn học kỳ </SelectItem>
              {filteredSemesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.code}>
                  {semester.code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Chỉ hiển thị CardSemester nếu đã chọn năm */}
      {selectedYear !== "" && filteredBySemester.length > 0 && (
        <div className="mt-4">
          <CardSemester
            data={filteredBySemester.map((semester) => ({
              id: semester.id,
              code: semester.code,
              year: semester.year,
              start_date: semester.start_date,
              end_date: semester.end_date,
            }))}
          />
        </div>
      )}
    </div>
  );
};
