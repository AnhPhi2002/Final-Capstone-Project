import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { SubmissionRound, Semester } from "@/lib/api/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react";
import { PaginationDashboardPage } from "@/pages/admin/pagination";

type CardDeadlineTopicProps = {
  data: SubmissionRound[];
  loading: boolean;
  selectedSemester: string;
};

export const CardDeadlineTopic: React.FC<CardDeadlineTopicProps> = ({
  data,
  loading,
  selectedSemester,
}) => {
  const navigate = useNavigate();
  const semesters = useSelector((state: RootState) => state.semesters.data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getSemesterCode = (semesterId: string) => {
    const semester = semesters.find((s: Semester) => s.id === semesterId);
    return semester ? semester.code : "Không xác định";
  };

  // Lọc dữ liệu theo semester và không bị xóa
  const filteredData = data.filter(
    (round) => round.semesterId === selectedSemester && !round.isDeleted
  );

  // Nhóm dữ liệu theo type
  const groupedData = filteredData.reduce((acc, round) => {
    if (!acc[round.type]) {
      acc[round.type] = [];
    }
    acc[round.type].push(round);
    return acc;
  }, {} as Record<string, SubmissionRound[]>);

  // Lấy danh sách các type
  const types = Object.keys(groupedData);

  // Tính tổng số trang dựa trên type có nhiều vòng nộp nhất
  const maxItems = Math.max(...types.map((type) => groupedData[type].length), 0);
  const totalPages = Math.ceil(maxItems / itemsPerPage);

  // Lấy dữ liệu phân trang cho từng type
  const paginatedData = types.reduce((acc, type) => {
    acc[type] = groupedData[type].slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return acc;
  }, {} as Record<string, SubmissionRound[]>);

  const handleCardClick = (submissionId: string, semesterId: string) => {
    navigate(`/examination/deadline-topic/${semesterId}/submission/${submissionId}`);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg font-semibold mt-5">
        Đang tải vòng nộp...
      </p>
    );
  }

  if (selectedSemester === "all") return null;

  return (
    <div>
      {types.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold mt-5">
          Chưa có vòng nộp nào cho kỳ học này.
        </p>
      ) : (
        types.map((type) => (
          <div key={type} className="mb-8">
            {/* Tiêu đề cho mỗi type */}
            <h2 className="text-2xl font-bold mb-4">{type}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData[type].map((round) => (
                <Card
                  key={round.id}
                  className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
                  onClick={() => handleCardClick(round.id, round.semesterId)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {round.description}
                    </CardTitle>
                    <CardDescription>
                      Học kỳ: {getSemesterCode(round.semesterId)}
                    </CardDescription>
                    <CardDescription>Vòng nộp lần: {round.roundNumber}</CardDescription>
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
          </div>
        ))
      )}

      {/* Phân trang */}
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