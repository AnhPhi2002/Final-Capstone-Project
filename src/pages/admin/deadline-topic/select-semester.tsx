import React, { useState } from "react";

import { semesters, years, submissionRounds } from "./data";
import { SubmissionRound } from "@/types/deadline-topic";
import { CardDeadlineTopic } from "./card-deadline-topic";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectSemester: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedSemesterData, setSelectedSemesterData] = useState<SubmissionRound[]>([]); // Fix lỗi kiểu dữ liệu

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value);
    if (value !== "all") {

      const filteredRounds: SubmissionRound[] = submissionRounds
        .filter((round) => round.semester_id === value)
        .map((round) => ({
          ...round,
          status: round.status as "PENDING" | "ACTIVE" | "COMPLETE",
        }));
  
      setSelectedSemesterData(filteredRounds);
    } else {
      setSelectedSemesterData([]);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        {/* Chọn năm học */}
        <Select onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn năm học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm học</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Chọn kỳ học */}
        <Select onValueChange={handleSemesterChange} value={selectedSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              <SelectItem value="all">Chọn học kỳ</SelectItem>
              {semesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Hiển thị danh sách vòng nộp nếu có kỳ học được chọn */}
      {selectedSemester !== "all" && selectedSemesterData.length > 0 && (
        <CardDeadlineTopic data={selectedSemesterData} />
      )}
    </div>
  );
};

