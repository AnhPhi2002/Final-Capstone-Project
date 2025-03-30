import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import { SubmissionRound } from "@/lib/api/types";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchSubmissionRounds } from "@/lib/api/redux/submissionRoundSlice";

import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function DeadineTopicDetailPage() {
  const { semesterId, submissionId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  // Lấy danh sách vòng nộp từ Redux
  const { data: submissionRounds, loading, error } = useSelector((state: RootState) => state.submissionRounds);

  // Gọi API lấy danh sách vòng nộp khi vào trang
  useEffect(() => {
    if (semesterId && semesterId !== "undefined") {
      dispatch(fetchSubmissionRounds(semesterId));
    }
  }, [semesterId, dispatch]);

  console.log("Params:", { semesterId, submissionId });
  console.log("Submission Rounds in Redux:", submissionRounds);

  // Lọc vòng nộp theo submissionId
  const filteredRounds = useMemo(() => {
    if (!submissionId || !submissionRounds) return [];
    return submissionRounds.filter((round) => round.id === submissionId);
  }, [submissionRounds, submissionId]);

  console.log("Filtered Rounds:", filteredRounds);

  const table = useReactTable<SubmissionRound>({
    data: filteredRounds,
    columns: columns as ColumnDef<SubmissionRound, any>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Đang tải dữ liệu..." href="/deadine-topic" currentPage="Chi tiết vòng nộp" />
        <div className="p-5 text-center text-gray-500">Đang tải vòng nộp...</div>
      </div>
    );
  }

  if (error || filteredRounds.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Không tìm thấy" href="/examination/deadline-topic" currentPage="Chi tiết vòng nộp" />
        <div className="p-5 text-center text-red-500">Không tìm thấy vòng nộp đề tài.</div>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/examination/deadline-topic");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Thời gian đăng kí đợt đề tài" href="/examination/deadline-topic" currentPage=" Chi tiết thời gian đăng kí đợt đề tài" />
      <div className="p-5 flex-1 overflow-auto">
      <div className="mb-5">
          <Button onClick={handleBack} >
           <ArrowLeft /> Quay lại
          </Button>
        </div>
        <DataTable table={table} />
      </div>
    </div>
  );
}
