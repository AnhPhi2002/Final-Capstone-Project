// StudentsDetailPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsBySemester } from "@/lib/api/redux/studentSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { getStudentColumns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import ToolPanel from "./tool-panel";
import { PaginationDashboardPage } from "@/pages/admin/pagination";

export const StudentsDetailPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector(
    (state: RootState) => state.students
  );

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page
  const [filterStatus, setFilterStatus] = useState("*");

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchStudentsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);

  useEffect(() => {
    setCurrentPage(1); // reset trang khi filter hoặc search thay đổi
  }, [filterStatus, searchText]);

  const filteredStudents = useMemo(() => {
    const lowerSearch = searchText.trim().toLowerCase();

    return students.filter((student) => {
      // Filter theo trạng thái
      const statusMatch = (() => {
        switch (filterStatus) {
          case "*":
            return true;
          case "qualified":
            return student.qualificationStatus === "qualified";
          case "not-qualified":
            return student.qualificationStatus === "not qualified";
          case "block-3":
            return student.block3 === true;
          case "block-10":
            return student.block3 === false;
          default:
            return true;
        }
      })();

      // Filter theo từ khoá tìm kiếm
      const searchMatch =
        student.email.toLowerCase().includes(lowerSearch) ||
        student.studentCode.toLowerCase().includes(lowerSearch) ||
        student.major.toLowerCase().includes(lowerSearch) ||
        student.specialization.toLowerCase().includes(lowerSearch);

      return statusMatch && searchMatch;
    });
  }, [students, filterStatus, searchText]);



  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
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
        <ToolPanel
          onFilterChange={setFilterStatus}
          onSearchChange={setSearchText}
        />

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
            <DataTable
              columns={getStudentColumns(currentPage, itemsPerPage, searchText)}
              data={currentStudents}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />

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
