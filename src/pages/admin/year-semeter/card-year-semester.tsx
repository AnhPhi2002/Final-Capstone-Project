import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationDashboardPage } from "../pagination";
import { UpdateYearSemester } from "./update-year-semester";
import { DeteleYearSemester } from "./detele-year-semester";

export const CardYearSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: initialYears,
    loading,
    error,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.years);

  const [years, setYears] = useState(initialYears); // State cục bộ để quản lý danh sách years
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchYears({ page, pageSize: 9 }));
  }, [dispatch, page]);

  useEffect(() => {
    setYears(initialYears); // Cập nhật state cục bộ khi Redux store thay đổi
  }, [initialYears]);

  const handleUpdateSuccess = (updatedYear: number, yearId: string) => {
    setYears((prevYears) =>
      prevYears.map((year) =>
        year.id === yearId ? { ...year, year: updatedYear } : year
      )
    );
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((item) => (
          <Card key={item.id} className="w-full p-4 shadow-md border rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Năm học {item.year}</CardTitle>
            </CardHeader>
            <div className="flex justify-end space-x-2">
              <DeteleYearSemester yearId={item.id} />
              <UpdateYearSemester
                yearId={item.id}
                currentYear={item.year}
                onUpdateSuccess={handleUpdateSuccess}
              />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <PaginationDashboardPage
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
