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
import { AcademicYearCouncil } from "@/types/council-member";
import { CardBv } from "./card-semester";


export const SelectSemester: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedDefense, setSelectedDefense] = useState<string>("all");

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
    setSelectedDefense("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-10">
        {/* Select Năm Học */}
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

        {/* Select Kỳ Học */}
        <Select onValueChange={setSelectedSemester} value={selectedSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn kỳ học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              <SelectItem value="all">Chọn học kỳ</SelectItem>
              {filteredSemesters.map((semester) => (
                <SelectItem key={semester.id} value={semester.code}>
                  {semester.code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select Bảo vệ lần 1 / 2 */}
        <Select onValueChange={setSelectedDefense} value={selectedDefense}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn bảo vệ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Bảo vệ</SelectLabel>
              <SelectItem value="all">Chọn bảo vệ</SelectItem>
              {filteredBySemester.map((semester) => (
                <React.Fragment key={semester.id}>
                  <SelectItem value={`bv1-${semester.id}`}>Bảo vệ lần 1</SelectItem>
                  <SelectItem value={`bv2-${semester.id}`}>Bảo vệ lần 2</SelectItem>
                </React.Fragment>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="">
      {selectedDefense !== "all" && (
        <CardBv 
          data={filteredBySemester.map((semester) => ({
            id: semester.id,
            code: semester.code,
            year: semester.year,
            start_date_bv1: semester.start_date_bv1,
            end_date_bv1: semester.end_date,
            start_date_bv2: semester.start_date_bv2,
            end_date_bv2: semester.end_date,
          }))}
        />
      )}
      </div>
    
    </div>
  );
};
