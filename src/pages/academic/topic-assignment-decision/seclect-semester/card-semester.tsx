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
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { Badge } from "@/components/ui/badge";

type CardSemesterProps = {
  data: Semester[];
  submissionRounds: any[]; // ✅ Nhận danh sách vòng nộp
};

export const CardSemester: React.FC<CardSemesterProps> = ({ data, submissionRounds }) => {
  const navigate = useNavigate();
  const years = useSelector((state: RootState) => state.years.data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng items trên mỗi trang

  // ✅ Chỉ lấy học kỳ có ít nhất một vòng nộp
  const filteredSemesters = data.filter((semester) =>
    submissionRounds.some((round) => round.semesterId === semester.id)
  );

  const totalPages = Math.ceil(filteredSemesters.length / itemsPerPage);

  const getYearById = (yearId: string) => {
    const foundYear = years.find((year) => year.id === yearId);
    return foundYear ? foundYear.year : "Unknown Year";
  };

  const handleCardClick = (semesterId: string) => {
    // Tìm vòng nộp có `semesterId` tương ứng
    const submissionRound = submissionRounds.find(
      (round) => round.semesterId === semesterId
    );
  
    if (submissionRound) {
      navigate(`/academic//topic-assignment-decision-detail ${semesterId}`);
    }
  };
  

  const paginatedData = filteredSemesters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {paginatedData.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">
          Không có học kỳ nào có vòng nộp
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((semester) => {
              // Lọc vòng nộp theo học kỳ
              const filteredRounds = submissionRounds.filter(round => round.semesterId === semester.id);
              
              return (
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
                    {/* ✅ Hiển thị danh sách vòng nộp */}
                      <ul className="text-sm text-gray-600">
                        {filteredRounds.map((round) => (
                          <li key={round.id} className="flex items-center gap-2">
                          <span>🔹 {round.description}</span>
                          <Badge
                            className={
                              round.status === "ACTIVE"
                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                : round.status === "COMPLETE"
                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                          >
                            {round.status}
                          </Badge>
                        </li>
                        ))}
                      </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end mt-6">
            <PaginationDashboardPage
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
