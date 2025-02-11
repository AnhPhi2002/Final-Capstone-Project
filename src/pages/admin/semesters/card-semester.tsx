import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { Semester } from "@/lib/api/types";

type CardSemesterProps = {
  data: Semester[];
};

export const CardSemester: React.FC<CardSemesterProps> = ({ data }) => {
  const navigate = useNavigate();

  // Lấy danh sách years từ Redux store
  const years = useSelector((state: RootState) => state.years.years);

  // Hàm tìm `year` từ `yearId`
  const getYearById = (yearId: string) => {
    const foundYear = years.find((year) => year.id === yearId);
    return foundYear ? foundYear.year : "Unknown Year"; // Nếu không tìm thấy, trả về "Unknown Year"
  };

  const handleCardClick = (id: string) => {
    navigate(`/semester/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">No semesters available</p>
      ) : (
        data.map((semester) => (
          <div
            key={semester.id}
            className="p-4 border rounded-md cursor-pointer hover:shadow-lg"
            onClick={() => handleCardClick(semester.id)}
          >
            <h3 className="text-lg font-bold">{semester.code}</h3>
            <p className="text-sm">Year: {getYearById(semester.yearId)}</p>
            <p className="text-sm">Status: {semester.status}</p>
            <p className="text-sm">Start Date: {new Date(semester.startDate).toLocaleDateString()}</p>
            <p className="text-sm">End Date: {new Date(semester.endDate).toLocaleDateString()}</p>
            <p className="text-sm">Registration Deadline: {new Date(semester.registrationDeadline).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};
