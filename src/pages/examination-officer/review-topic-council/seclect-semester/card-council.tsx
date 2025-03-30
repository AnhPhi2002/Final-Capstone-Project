import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Dot } from "lucide-react";
import { Council } from "@/lib/api/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationDashboardPage } from "@/pages/admin/pagination";

type CardCouncilProps = {
  councils: Council[];
  semesterId: string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN"); // Format: DD/MM/YYYY
};
// Chuyển type sang tiếng Việt
const getRoundTypeLabel = (type?: string) => {
  switch (type?.trim()) {
    case "topic":
      return "Đợt nộp đề tài";
    case "check-topic":
      return "Xét duyệt đề tài";
    case "review":
      return "Kiểm tra đồ án";
    case "defense":
      return "Bảo vệ đồ án";
    default:
      return "Không xác định";
  }
};

export const CardCouncil: React.FC<CardCouncilProps> = ({
  councils,
  semesterId,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const activeCouncils = councils.filter((council) => !council.isDeleted);
  const totalPages = Math.ceil(activeCouncils.length / itemsPerPage);

  const paginatedData = activeCouncils.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (councilId: string) => {
    navigate(`/examination/review-topic-council-detail/${councilId}/${semesterId}`);
  };

  return (
    <div className="space-y-6">
      {paginatedData.length === 0 ? (
        <p className="text-gray-500 text-center">Không có hội đồng nào</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((council) => {
              const roundTypeLabel = getRoundTypeLabel(council.type);
              return (
                <Card
                  key={council.id}
                  className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
                  onClick={() => handleCardClick(council.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {council.name}
                    </CardTitle>
                    <CardDescription>
                      Bắt đầu: {formatDate(council.councilStartDate)} - Kết thúc {formatDate(council.councilEndDate)}
                    </CardDescription>
                    <CardDescription>
                      Vòng nộp lần: {council.round} - {roundTypeLabel}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Dot
                          size={40}
                          className={
                            council.status === "ACTIVE"
                              ? "text-green-600"
                              : council.status === "UPCOMING"
                              ? "text-yellow-600"
                              : council.status === "COMPLETE"
                              ? "text-blue-600"
                              : "text-gray-600"
                          }
                        />
                        Trạng thái
                      </span>
                      <Badge
                        className={
                          council.status === "ACTIVE"
                            ? "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200"
                            : council.status === "UPCOMING"
                            ? "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200"
                            : council.status === "COMPLETE"
                            ? "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
                        }
                      >
                        {council.status === "ACTIVE"
                          ? "Đang hoạt động"
                          : council.status === "UPCOMING"
                          ? "Sắp diễn ra"
                          : council.status === "COMPLETE"
                          ? "Hoàn thành"
                          : "Không xác định"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
        </>
      )}
    </div>
  );
};
