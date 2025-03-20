import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchStudentsWithoutGroup } from "@/lib/api/redux/studentWithoutGroupSlice";
import { useParams } from "react-router";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ToolPanel from "./tool-panel";
import { PaginationDashboardPage } from "@/pages/admin/pagination";


export const NotGroupStudentDetailPage = () => {
  const dispatch = useAppDispatch();
  const { semesterId } = useParams<{ semesterId: string }>();
  const { students, loading, error } = useAppSelector((state) => state.studentsWithoutGroup);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const totalPages = students.length > 0 ? Math.ceil(students.length / itemsPerPage) : 1;

  useEffect(() => {
    if (semesterId?.trim()) {
      dispatch(fetchStudentsWithoutGroup(semesterId));
    }
  }, [dispatch, semesterId]);

  const currentStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Đang tải danh sách sinh viên...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách sinh viên chưa có nhóm KLTN" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
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
      </div>
    </div>
  );
};
