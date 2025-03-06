import Header from "@/components/header";
import { DataTable } from "./data-table";
import { useMemo } from "react";
import { useParams } from "react-router";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";

import { Lecturer } from "@/types/Lecturer";
import { ToolPanel } from "./tool-panel";
import { columnsLecturer } from "./columns";

const mockLecturers: Lecturer[] = [
  {
    id: "1",
    lecturerCode: "GV001",
    email: "lecturer1@example.com",
    fullName: "Nguyễn Văn A",
    isActive: true,
  },
  {
    id: "2",
    lecturerCode: "GV002",
    email: "lecturer2@example.com",
    fullName: "Trần Thị B",
    isActive: false,
  },
  {
    id: "3",
    lecturerCode: "GV003",
    email: "lecturer3@example.com",
    fullName: "Lê Văn C",
    isActive: true,
  },
  {
    id: "4",
    lecturerCode: "GV004",
    email: "lecturer4@example.com",
    fullName: "Phạm Thị D",
    isActive: false,
  },
  {
    id: "5",
    lecturerCode: "GV005",
    email: "lecturer5@example.com",
    fullName: "Hoàng Văn E",
    isActive: true,
  },
];

export const ReviewTopicCouncilDetail = () => {
  const { submissionId } = useParams();

  const filteredLecturers = useMemo(() => {
    if (!submissionId) return mockLecturers;
    return mockLecturers.filter((lecturer) => lecturer.id === submissionId);
  }, [submissionId]);

  const table = useReactTable<Lecturer>({
    data: filteredLecturers,
    columns: columnsLecturer, 
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết hội đồng xét duyệt" href="/review-topic" currentPage="Quản lý giảng viên" />
      <div className="p-6 flex-1 overflow-auto">
        <ToolPanel table={table} />
        <DataTable table={table} />
      </div>
    </div>
  );
};
