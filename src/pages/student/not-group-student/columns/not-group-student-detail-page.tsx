import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchStudentsWithoutGroupForStudent } from "@/lib/api/redux/studentWithoutGroupSlice";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ToolPanel from "./tool-panel";
import { PaginationDashboardPage } from "../../pagination";

export interface StudentNotGroupForStudent {
  studentId: string;
  fullName: string;
  email: string;
  major: string;
}

export const NotGroupStudentDetailPage = () => {
  const dispatch = useAppDispatch();
  const { studentsForStudent, loading, error } = useAppSelector(
    (state) => state.studentsWithoutGroup
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchStudentsWithoutGroupForStudent());
  }, [dispatch]);

  const currentStudents = (studentsForStudent as unknown as StudentNotGroupForStudent[]).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  const totalPages =
    studentsForStudent && studentsForStudent.length > 0
      ? Math.ceil(studentsForStudent.length / itemsPerPage)
      : 1;

  return (
    <div className="flex flex-col">
      <ToolPanel />

      {loading && <p>Đang tải danh sách sinh viên...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
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
  );
};
