import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { Semester, SubmissionRound } from "@/lib/api/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react";

type CardSemesterProps = {
  selectedSemester: string;
  data: SubmissionRound[];
  loading: boolean;
};

const getRoundTypeLabel = (type: string) => {
  switch (type) {
    case "TOPIC":
      return "Đợt nộp đề tài";
    case "CHECK-TOPIC":
      return "Xét duyệt đề tài";
    case "REVIEW":
      return "Kiểm tra đồ án";
    case "DEFENSE":
      return "Bảo vệ đồ án";
    default:
      return "Không xác định";
  }
};

export const CardSemester: React.FC<CardSemesterProps> = ({
  selectedSemester,
  data,
  loading,
}) => {
  const navigate = useNavigate();
  const semesters = useSelector((state: RootState) => state.semesters.data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getSemesterCode = (semesterId: string) => {
    const semester = semesters.find((s: Semester) => s.id === semesterId);
    return semester ? semester.code : "Không xác định";
  };

  const filteredData = data.filter(
    (round) =>
      round.semesterId === selectedSemester &&
      round.type === "TOPIC" &&
      !round.isDeleted
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (
    round: SubmissionRound,
  ) => {
    navigate(
      `/lecturer/topic-list/semester/${round.semesterId}/submission/${round.id}/round/${round.roundNumber}/type/${round.type}`
    );
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-5">Đang tải vòng nộp...</p>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-5">
        Chưa có vòng nộp nào cho học kỳ này.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((round) => (
          <Card
            key={round.id}
            className="w-full p-4 shadow-md border rounded-lg hover:shadow-lg transition"
            onClick={() =>
              handleCardClick(
                round
              )
            }
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                {round.description}
              </CardTitle>
              <CardDescription>
                Học kỳ: {getSemesterCode(round.semesterId)}
              </CardDescription>
              <CardDescription>
                Vòng nộp lần: {round.roundNumber} -{" "}
                {getRoundTypeLabel(round.type)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Dot
                    size={40}
                    className={
                      round.status === "ACTIVE"
                        ? "text-green-600"
                        : round.status === "UPCOMING"
                        ? "text-yellow-600"
                        : round.status === "COMPLETE"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }
                  />
                  Trạng thái
                </span>
                <Badge
                  className={
                    round.status === "ACTIVE"
                      ? "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200"
                      : round.status === "UPCOMING"
                      ? "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200"
                      : round.status === "COMPLETE"
                      ? "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200"
                      : "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
                  }
                >
                  {round.status === "ACTIVE"
                    ? "Đang hoạt động"
                    : round.status === "UPCOMING"
                    ? "Sắp diễn ra"
                    : round.status === "COMPLETE"
                    ? "Hoàn thành"
                    : "Không xác định"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <PaginationDashboardPage
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
