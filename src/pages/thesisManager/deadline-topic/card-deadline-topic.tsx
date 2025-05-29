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
import { Dot, BookOpen, CheckCircle, Eye, ShieldCheck } from "lucide-react";
import { PaginationDashboardPage } from "@/pages/admin/pagination";

type CardDeadlineTopicProps = {
  data: SubmissionRound[];
  loading: boolean;
  selectedSemester: string;
};

const TYPE_INFO: Record<string, { label: string; icon: React.ReactNode }> = {
  TOPIC: {
    label: "Đợt nộp đề tài",
    icon: <BookOpen className="w-5 h-5" />,
  },
  "CHECK-TOPIC": {
    label: "Xét duyệt đề tài",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  REVIEW: {
    label: "Kiểm tra đồ án",
    icon: <Eye className="w-5 h-5" />,
  },
  DEFENSE: {
    label: "Bảo vệ đồ án",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Đang hoạt động",
  UPCOMING: "Sắp diễn ra",
  COMPLETE: "Hoàn thành",
};

const STATUS_COLOR: Record<string, string> = {
  ACTIVE:
    "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200",
  UPCOMING:
    "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200",
  COMPLETE:
    "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200",
  UNKNOWN: "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200",
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
    return (
      semesters.find((s: Semester) => s.id === semesterId)?.code ||
      "Không xác định"
    );
  };

  const filteredData = data.filter(
    (round) => round.semesterId === selectedSemester && !round.isDeleted
  );

  const groupedData = filteredData.reduce((acc, round) => {
    (acc[round.type] ||= []).push(round);
    return acc;
  }, {} as Record<string, SubmissionRound[]>);

  // Chỉ lấy các type là "REVIEW" và "DEFENSE"
  const types = Object.keys(groupedData).filter((type) =>
    ["REVIEW", "DEFENSE"].includes(type)
  );

  const maxItems = Math.max(
    ...types.map((type) => groupedData[type]?.length || 0),
    0
  );
  const totalPages = Math.ceil(maxItems / itemsPerPage);

  const paginatedData = types.reduce((acc, type) => {
    acc[type] = groupedData[type].slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return acc;
  }, {} as Record<string, SubmissionRound[]>);

  const handleCardClick = (submissionId: string, semesterId: string) => {
    navigate(
      `/graduation-thesis/deadline-topic/${semesterId}/submission/${submissionId}`
    );
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
        types.map((type) => {
          const typeInfo = TYPE_INFO[type] || {
            label: type,
            icon: null,
            color: "text-gray-600",
          };

          return (
            <div key={type} className="mb-8">
              <div
                className={`flex items-center gap-2 mb-4 font-bold italic text-xl`}
              >
                <span>{typeInfo.label}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData[type].map((round) => (
                  <Card
                    key={round.id}
                    className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200 cursor-pointer"
                    onClick={() => handleCardClick(round.id, round.semesterId)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {round.description}
                      </CardTitle>
                      <CardDescription>
                        Học kỳ: {getSemesterCode(round.semesterId)}
                      </CardDescription>
                      <CardDescription>
                        Vòng: {round.roundNumber} -{" "}
                        {TYPE_INFO[round.type]?.label || round.type}
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
                            STATUS_COLOR[round.status] ||
                            STATUS_COLOR["UNKNOWN"]
                          }
                        >
                          {STATUS_LABELS[round.status] || "Không xác định"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })
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