
import { useParams } from "react-router";
import { submissionRounds, semesters } from "../data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import { SubmissionRound } from "@/types/deadline-topic";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";

export function DeadineTopicDetailPage() {
  const { semesterId, roundNumber } = useParams();

  // Tìm kỳ học theo `semesterId`
  const selectedSemester = semesters.find((s) => s.id === semesterId);

  // Lọc vòng nộp theo `semesterId` và `roundNumber`
  const filteredRounds: SubmissionRound[] = submissionRounds
    .filter((round) => round.semester_id === semesterId && round.round_number.toString() === roundNumber)
    .map((round) => ({
      ...round,
      status: round.status as "PENDING" | "ACTIVE" | "COMPLETE",
    }));

  if (!selectedSemester || filteredRounds.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Không tìm thấy" href="/deadine-topic" currentPage="Semester Detail" />
        <div className="p-5">Không tìm thấy vòng nộp đề tài</div>
      </div>
    );
  }

  // Tạo bảng dữ liệu với `useReactTable`
  const table = useReactTable<SubmissionRound>({
    data: filteredRounds,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col h-screen">
      <Header title={`Chi tiết vòng nộp: ${selectedSemester.code}`} href={`/deadine-topic/${semesterId}`} currentPage="Round Detail" />
      <div className="p-5 flex-1 overflow-auto">
        <DataTable table={table} />
      </div>
    </div>
  );
}
