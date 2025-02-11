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
import groupData from "@/data/group-student.json"; // Import dữ liệu nhóm
import { CardSemester } from "./card-semester";
import { Group, GroupStatus, Role, Status } from "@/types/group-student"; // Import đúng type Group

export const SelectSemester: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  const academicData: Group[] = groupData.map((group) => ({
    ...group,
    status: group.status as GroupStatus,
    group_members: group.group_members.map((member) => ({
      ...member,
      role: member.role as Role,
      status: member.status as Status,
    })),
  })); // Ép kiểu dữ liệu JSON sang Group[]

  // Lấy danh sách các năm học duy nhất
  const years = [...new Set(academicData.map((group) => group.year))];

  // Lọc danh sách nhóm theo năm học đã chọn
  const filteredGroups =
    selectedYear === ""
      ? []
      : academicData.filter((group) => group.year === selectedYear);

  // Lọc danh sách nhóm theo học kỳ đã chọn
  const filteredBySemester =
    selectedSemester === "all"
      ? filteredGroups
      : filteredGroups.filter((group) => group.code === selectedSemester);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedSemester("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {/* Dropdown chọn năm học */}
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

        {/* Dropdown chọn học kỳ */}
        <Select onValueChange={setSelectedSemester} value={selectedSemester} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn kỳ học" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kỳ học</SelectLabel>
              <SelectItem value="all">Tất cả học kỳ</SelectItem>
              {filteredGroups.map((group) => (
                <SelectItem key={group.id} value={group.code}>
                  {group.code}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Chỉ hiển thị danh sách nếu đã chọn năm */}
      {selectedYear !== "" && filteredBySemester.length > 0 && (
        <div className="mt-4">
          <CardSemester
            data={filteredBySemester.map((group) => ({
              id: group.id.toString(),
              code: group.code,
              year: group.year,
              start_date: group.start_date,
              end_date: group.end_date,
            }))}
          />
        </div>
      )}
    </div>
  );
};
