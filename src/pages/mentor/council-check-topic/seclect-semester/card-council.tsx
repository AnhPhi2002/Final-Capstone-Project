import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Council } from "@/lib/api/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react";

type CardCouncilProps = {
  councils: Council[];
  semesterId: string;
  // submissionPeriodId?: string;
};

export const CardCouncil: React.FC<CardCouncilProps> = ({
  councils,
  semesterId,
  // submissionPeriodId,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const activeCouncils = councils.filter((council) => !council.isDeleted);

  const totalPages = Math.ceil(activeCouncils.length / itemsPerPage);

  const handleCardClick = (councilId: string) => {
    navigate(`/lecturer/council-check/${councilId}/${semesterId}`);
  };

  const paginatedData = activeCouncils.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {paginatedData.length === 0 ? (
        <p className="text-gray-500 text-center">Bạn không thuộc hội đồng nào trong kỳ này</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((council) => (
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
                    Ngày tạo:{" "}
                    {council.createdDate
                      ? new Date(council.createdDate).toLocaleDateString()
                      : "Không xác định"}
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
        </>
      )}
    </div>
  );
};