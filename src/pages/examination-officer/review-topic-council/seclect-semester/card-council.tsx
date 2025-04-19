import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Dot } from "lucide-react";
import { CouncilDetail } from "@/lib/api/types";
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
  councils: CouncilDetail[];
  semesterId: string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

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
  console.log("Councils:", councils); // Ghi log để kiểm tra dữ liệu

  // ✅ Kiểm tra an toàn để tránh undefined/null
  const activeCouncils = (councils || []).filter(
    (council) => council && council.council && !council.council.isDeleted
  );
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
              const { council: c } = council;
              const roundTypeLabel = getRoundTypeLabel(c.type);
              return (
                <Card
                  key={c.id}
                  className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
                  onClick={() => handleCardClick(c.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {c.name}
                    </CardTitle>
                    <CardDescription>
                      Bắt đầu: {formatDate(c.councilStartDate)} - Kết thúc{" "}
                      {formatDate(c.councilEndDate)}
                    </CardDescription>
                    <CardDescription>
                      Vòng nộp lần: {c.round} - {roundTypeLabel}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Dot
                          size={40}
                          className={
                            c.status === "ACTIVE"
                              ? "text-green-600"
                              : c.status === "UPCOMING"
                              ? "text-yellow-600"
                              : c.status === "COMPLETE"
                              ? "text-blue-600"
                              : "text-gray-600"
                          }
                        />
                        Trạng thái
                      </span>
                      <Badge
                        className={
                          c.status === "ACTIVE"
                            ? "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200"
                            : c.status === "UPCOMING"
                            ? "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200"
                            : c.status === "COMPLETE"
                            ? "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
                        }
                      >
                        {c.status === "ACTIVE"
                          ? "Đang hoạt động"
                          : c.status === "UPCOMING"
                          ? "Sắp diễn ra"
                          : c.status === "COMPLETE"
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