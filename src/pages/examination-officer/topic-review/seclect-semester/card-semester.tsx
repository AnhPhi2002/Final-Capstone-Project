import React, { useState } from "react";
import { useNavigate } from "react-router";

import { SubmissionRound } from "@/lib/api/types";
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
import { RootState } from "@/lib/api/redux/store";
import { useSelector } from "react-redux";
import {  Semester } from "@/lib/api/types";

type CardSemesterProps = {
  data: SubmissionRound[];
  loading: boolean;
  selectedSemester: string;
};


export const CardSemester: React.FC<CardSemesterProps> = ({
  data,
  loading,
  selectedSemester,
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 6; // Số vòng nộp trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const semesters = useSelector((state: RootState) => state.semesters.data); // Lấy semesters từ Redux

    // Hàm lấy semester.code dựa trên semesterId
    const getSemesterCode = (semesterId: string) => {
      const semester = semesters.find((s: Semester) => s.id === semesterId);
      return semester ? semester.code : "Không xác định";
    };
  

  // Lọc dữ liệu vòng nộp theo selectedSemester
  const filteredData = data.filter(
    (round) => round.semesterId === selectedSemester
  );

  // Tính tổng số trang dựa trên dữ liệu đã lọc
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Lấy dữ liệu phân trang
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (semesterId: string, submissionRoundId: string) => {
    navigate(
      `/examination/review-topic-list/${semesterId}/submission/${submissionRoundId}`
    );
  };

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
                   <CardDescription>
                   Vòng nộp lần: {round.roundNumber}
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