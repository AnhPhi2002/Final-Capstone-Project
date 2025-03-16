import React, { useState } from "react";
import { useNavigate } from "react-router";
import { SubmissionRound } from "@/lib/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Import Badge UI nếu cần
import { PaginationDashboardPage } from "../pagination";

type CardDeadlineTopicProps = {
  data: SubmissionRound[];
  loading: boolean;
  selectedSemester: string;
};

// Định nghĩa màu sắc cho từng trạng thái
const statusClasses: { [key in "ACTIVE" | "COMPLETE" | "PENDING"]: string } = {
  ACTIVE: "bg-green-100 text-green-600 hover:bg-green-200",
  COMPLETE: "bg-blue-100 text-blue-600 hover:bg-blue-200",
  PENDING: "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

// Component hiển thị trạng thái dưới dạng Badge
const StatusBadge = ({
  status,
}: {
  status: "ACTIVE" | "COMPLETE" | "PENDING";
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

export const CardDeadlineTopic: React.FC<CardDeadlineTopicProps> = ({
  data,
  loading,
  selectedSemester,
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 6; // Số vòng nộp trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính tổng số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Lấy dữ liệu theo trang hiện tại
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (submissionId: string, Id: string) => {
    navigate(`/examination/deadline-topic/${Id}/submission/${submissionId}`);
  };

  console.log("🚀 Submission Rounds Data:", data);

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
    <div>
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
                onClick={() => handleCardClick(round.id, round.semesterId)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {round.description}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    Trạng thái:{" "}
                    <StatusBadge
                      status={round.status as "ACTIVE" | "COMPLETE" | "PENDING"}
                    />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
        <div className="flex justify-end mt-6">
          <PaginationDashboardPage
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

    </div>
  );
};
