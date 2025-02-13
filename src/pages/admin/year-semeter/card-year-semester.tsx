import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateYearSemester } from "./update-year-semester";
import { DeteleYearSemester } from "./detele-year-semester";
import { PaginationDashboardPage } from "../pagination";
export const CardYearSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading, error } = useSelector((state: RootState) => state.years);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(years.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  const paginatedYears = years.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedYears.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">Không có năm học nào</p>
        ) : (
          paginatedYears.map((item) => (
            <Card key={item.id} className="w-full p-4 shadow-md border rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Năm học: {item.year}</CardTitle>
              </CardHeader>
              <div className="flex justify-end space-x-2">
                <DeteleYearSemester yearId={item.id} />
                <UpdateYearSemester
                  yearId={item.id}
                  currentYear={item.year}
                  existingYears={years.map((y) => y.year)}
                  onUpdateSuccess={() => dispatch(fetchYears())} // Làm mới danh sách sau khi update
                />
              </div>
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
