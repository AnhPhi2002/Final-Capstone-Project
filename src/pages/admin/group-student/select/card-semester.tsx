import React from "react";
import { useNavigate } from "react-router"; // Kiểm tra import đúng
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardSemesterProps = {
  data: {
    id: string;
    code: string;
    year: string;
    start_date: string;
    end_date: string;
  }[];
};

export const CardSemester: React.FC<CardSemesterProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    console.log("Navigating to:", `/group-student/${id}`); // Debug URL
    navigate(`/group-student/${id}`); // Điều hướng đúng đến trang nhóm theo kỳ học
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((semester) => (
        <Card
          key={semester.id}
          className="cursor-pointer hover:shadow-lg"
          onClick={() => handleCardClick(semester.id)}
        >
          <CardHeader>
            <CardTitle>{semester.code}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Năm học: {semester.year}</p>
            <p className="text-sm text-gray-500">
              Ngày bắt đầu: {new Date(semester.start_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Ngày kết thúc: {new Date(semester.end_date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
