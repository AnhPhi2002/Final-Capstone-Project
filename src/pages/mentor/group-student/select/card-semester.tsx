import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { Semester } from "@/lib/api/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PaginationDashboardPage } from "../../pagination";
import { Dot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CardSemesterProps = {
  data: Semester[];
};

export const CardSemester: React.FC<CardSemesterProps> = ({ data }) => {
  const navigate = useNavigate();
  const years = useSelector((state: RootState) => state.years.data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getYearById = (yearId: string) => {
    const foundYear = years.find((year) => year.id === yearId);
    return foundYear ? foundYear.year : "Không xác định";
  };

  const handleCardClick = (id: string) => {
    navigate(`/lecturer/group-student/${id}`);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            Không có học kỳ nào.
          </p>
        ) : (
          paginatedData.map((semester) => (
            <Card
              key={semester.id}
              className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
              onClick={() => handleCardClick(semester.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Học kỳ: {semester.code}
                </CardTitle>
                <CardDescription>
                  Năm học: {getYearById(semester.yearId)}
                </CardDescription>
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
                        ? "bg-green-100 text-green-600 border border-green-500 hover:bg-green-200"
                        : semester.status === "UPCOMING"
                        ? "bg-yellow-100 text-yellow-600 border border-yellow-500 hover:bg-yellow-200"
                        : semester.status === "COMPLETE"
                        ? "bg-blue-100 text-blue-600 border border-blue-500 hover:bg-blue-200"
                        : "bg-gray-100 text-gray-600 border border-gray-500 hover:bg-gray-200"
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
          ))
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
