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

  // Dữ liệu card
  const cardData =
    selectedSemester === "all"
      ? filteredSemesters
      : filteredSemesters.filter((semester) => semester.code === selectedSemester);

  return (
    <div className="space-y-4">
      {/* Dropdown năm học và kỳ học */}
      <div className="flex items-center space-x-4">
        <Select onValueChange={(value) => setSelectedYear(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year === "all" ? "All Years" : year}
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

      {/* Hiển thị card */}
      <div className="mt-4">
        <CardSemester data={cardData} />
      </div>
    </div>
  );
};
