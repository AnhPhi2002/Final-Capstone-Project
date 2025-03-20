import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsBySemester } from "@/lib/api/redux/studentSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import ToolPanel from "./tool-panel";
import { PaginationDashboardPage } from "@/pages/admin/pagination";


export const StudentsDetailPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector((state: RootState) => state.students);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(students.length / itemsPerPage);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchStudentsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);

  // Slice students for the current page
  const currentStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Danh sách sinh viên"
        href="/"
        currentPage="Chi tiết danh sách sinh viên trong kỳ"
      />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <h1 className="text-xl font-bold">Đang tải dữ liệu...</h1>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-48">
            <h1 className="text-xl font-bold">Lỗi: {error}</h1>
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={currentStudents} />
            <div className="flex justify-end mt-6">
              <PaginationDashboardPage
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => {
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
