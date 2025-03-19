import React, { useState } from "react";
import { useNavigate } from "react-router";

import { SubmissionRound } from "@/lib/api/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { Badge } from "@/components/ui/badge";

type CardSemesterProps = {
  data: SubmissionRound[];
  loading: boolean;
  selectedSemester: string;
};

const statusClasses: { [key in "ACTIVE" | "COMPLETE" | "UPCOMING"]: string } = {
  ACTIVE: "bg-green-100 text-green-600 hover:bg-green-200",
  COMPLETE: "bg-blue-100 text-blue-600 hover:bg-blue-200",
  UPCOMING: "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

const StatusBadge = ({
  status,
}: {
  status: "ACTIVE" | "COMPLETE" | "UPCOMING";
}) => {
  return (
    <Badge
      className={`${
        statusClasses[status] || "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } px-2 py-1 rounded-md`}
    >
      {status}
    </Badge>
  );
};

export const CardSemester: React.FC<CardSemesterProps> = ({
  data,
  loading,
  selectedSemester,
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 6; // Số vòng nộp trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu vòng nộp theo selectedSemester
  const filteredData = data.filter(
    (round) => round.semesterId === selectedSemester
  );

  // Tính tổng số trang dựa trên dữ liệu đã lọc
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Lấy dữ liệu phân trang
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (semesterId: string, submissionRoundId: string,  roundNumber: number) => {
    navigate(
      `/examination/review-topic-list/${semesterId}/submission/${submissionRoundId}/round/${roundNumber}`
    );
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg font-semibold mt-5">
        Đang tải vòng nộp...
      </p>
    );
  }

  if (selectedSemester === "all") {
    return null;
  }

  return (
    <div className="space-y-6">
      {paginatedData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold mt-5">
          Chưa có vòng nộp nào cho kỳ học này.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedData.map((round) => (
            <Card
              key={round.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleCardClick(round.semesterId, round.id, round.roundNumber)}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {round.description}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  Vòng nộp: {round.roundNumber}
                </p>
              </CardContent>
              <CardContent>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  Trạng thái:{" "}
                  <StatusBadge
                    status={round.status as "ACTIVE" | "COMPLETE" | "UPCOMING"}
                  />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
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