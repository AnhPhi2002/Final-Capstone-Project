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
import semesterData from "@/data/semester.json";
import { CardSemester } from "./card-semester";

export const SelectSemester: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  const years = [
    "all",
    ...new Set(semesterData.map((semester) => semester.year)),
  ];

  const filteredSemesters =
    selectedYear === "all"
      ? semesterData
      : semesterData.filter((semester) => semester.year === selectedYear);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);

    const matchingSemester = filteredSemesters.find(
      (semester) => semester.code === selectedSemester
    );

    if (!matchingSemester) {
      setSelectedSemester("all"); 
    } else {
      setSelectedSemester(matchingSemester.code); 
    }
  };

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
      <div className="flex items-center space-x-4">
        <Select onValueChange={(value) => handleYearChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {years
                .filter((year) => year !== "all") 
                .map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

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
              {filteredSemesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.code}>
                  {semester.code}
                </SelectItem>
              ))}
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

