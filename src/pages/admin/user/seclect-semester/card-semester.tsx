import React, { useState } from "react";
import { Semester } from "@/lib/api/types";
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
  data: Semester[];
  loading: boolean;
  onCardClick?: (semesterId: string) => void;
};

export const CardSemester: React.FC<CardSemesterProps> = ({
//   selectedSemester,
  data,
  loading,
  onCardClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredData = data.filter((semester) => !semester.isDeleted);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Đang tải học kỳ...</p>;
  }

  if (filteredData.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Không có học kỳ nào trong năm học này.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((semester) => (
          <Card
            key={semester.id}
            className="w-full p-4 shadow-md border rounded-lg hover:shadow-lg transition cursor-pointer"
            onClick={() => onCardClick?.(semester.id)}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                {semester.code}
              </CardTitle>
              <CardDescription>Học kỳ: {semester.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Dot
                    size={40}
                    className={
                      semester.status === "ACTIVE"
                        ? "text-green-600"
                        : semester.status === "UPCOMING"
                        ? "text-yellow-600"
                        : semester.status === "COMPLETE"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }
                  />
                  Trạng thái
                </span>
                <Badge
                  className={
                    semester.status === "ACTIVE"
                      ? "bg-green-100 text-green-600 border border-green-500"
                      : semester.status === "UPCOMING"
                      ? "bg-yellow-100 text-yellow-600 border border-yellow-500"
                      : semester.status === "COMPLETE"
                      ? "bg-blue-100 text-blue-600 border border-blue-500"
                      : "bg-gray-100 text-gray-600 border border-gray-500"
                  }
                >
                  {semester.status === "ACTIVE"
                    ? "Đang hoạt động"
                    : semester.status === "UPCOMING"
                    ? "Sắp diễn ra"
                    : semester.status === "COMPLETE"
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