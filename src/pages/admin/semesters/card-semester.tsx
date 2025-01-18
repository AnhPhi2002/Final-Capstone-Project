import React from "react";
import { useNavigate } from "react-router";

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
    navigate(`/semesters/${id}`); // Điều hướng đến trang chi tiết
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((semester) => (
        <div
          key={semester.id}
          className="p-4 border rounded-md cursor-pointer hover:shadow-lg"
          onClick={() => handleCardClick(semester.id)}
        >
          <h3 className="text-lg font-bold">{semester.code}</h3>
          <p className="text-sm">Year: {semester.year}</p>
          <p className="text-sm">
            Start Date: {new Date(semester.start_date).toLocaleDateString()}
          </p>
          <p className="text-sm">
            End Date: {new Date(semester.end_date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};
