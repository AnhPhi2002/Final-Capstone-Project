import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionRoundDetail } from "@/lib/api/redux/submissionRoundSlice";
import { SubmissionRound } from "@/lib/api/types";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardDeadlineTopProps = {
  data: SubmissionRound[];
};

export const CardDeadlineTopic: React.FC<CardDeadlineTopProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy danh sách kỳ học từ Redux store
  const { data: semesters } = useSelector((state: RootState) => state.semesters);

  // Hàm tìm `code` của kỳ học dựa vào `semesterId`
  const getSemesterCode = (semesterId: string) => {
    const semester = semesters.find((s) => s.id === semesterId);
    return semester ? semester.code : "Không xác định";
  };

  const handleCardClick = (roundId: string) => {
    dispatch(fetchSubmissionRoundDetail(roundId));
  };

  return (
    <div>
      {data.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold mt-5">
          Chưa có vòng nộp nào cho kỳ học này.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((round) => (
            <Card
              key={round.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleCardClick(round.id)}
            >
              <CardHeader>
                <CardTitle>{round.description}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Kỳ học: {getSemesterCode(round.semesterId)}</p>
                <p className="text-sm text-gray-500">Trạng thái: {round.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
