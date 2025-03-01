import React from "react";
import { useNavigate } from "react-router";
import { SubmissionRound } from "@/types/deadline-topic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardDeadlineTopProps = {
  data: SubmissionRound[];
};

export const CardDeadlineTopic: React.FC<CardDeadlineTopProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (semesterId: string, roundNumber: number) => {
    navigate(`/deadine-topic/${semesterId}/round/${roundNumber}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((round) => (
        <Card
          key={round.id}
          className="cursor-pointer hover:shadow-lg"
          onClick={() => handleCardClick(round.semester_id, round.round_number)}
        >
          <CardHeader>
            <CardTitle>{round.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Kỳ học: {round.semester_id}</p>
            <p className="text-sm text-gray-500">
              Ngày bắt đầu: {new Date(round.start_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Ngày kết thúc: {new Date(round.end_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Trạng thái: {round.status}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
