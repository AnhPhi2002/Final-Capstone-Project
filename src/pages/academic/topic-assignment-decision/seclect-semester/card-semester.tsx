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
  submissionRounds: any[];
  selectedRoundId: string;
};

export const CardSemester: React.FC<CardSemesterProps> = ({
  data,
  submissionRounds,
  selectedRoundId,
}) => {
  const navigate = useNavigate();
  const years = useSelector((state: RootState) => state.years.data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const selectedRound = submissionRounds.find(
    (round) => round.id === selectedRoundId
  );

  if (!selectedRound) return null;

  const relatedSemesters = data.filter(
    (semester) =>
      semester.id === selectedRound.semesterId && !semester.isDeleted
  );

  const totalPages = Math.ceil(relatedSemesters.length / itemsPerPage);

  const getYearById = (yearId: string) => {
    const found = years.find((y) => y.id === yearId && !y.isDeleted);
    return found ? found.year : "Unknown Year";
  };

  const handleCardClick = () => {
    navigate(`/academic/topic-assignment-decision-detail`);
  };

  const paginated = relatedSemesters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500">Không có học kỳ nào</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((semester) => (
              <Card
                key={semester.id}
                className="p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition"
                onClick={handleCardClick}
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
                  <ul className="text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      🔹 {selectedRound.description}
                      <Badge
                        className={
                          selectedRound.status === "ACTIVE"
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : selectedRound.status === "COMPLETE"
                            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                      >
                        {selectedRound.status}
                      </Badge>
                    </li>
                  </ul>
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
