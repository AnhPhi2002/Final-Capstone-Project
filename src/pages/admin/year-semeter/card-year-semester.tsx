import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYears } from "@/lib/api/redux/yearSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CardYearSemester: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: years, loading, error, currentPage, totalPages } = useSelector((state: RootState) => state.years);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchYears({ page, pageSize: 6 }));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((item) => (
          <Card key={item.id} className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Năm học {item.year}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Trang trước
        </Button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={page === totalPages}>
          Trang tiếp theo
        </Button>
      </div>
    </div>
  );
};
