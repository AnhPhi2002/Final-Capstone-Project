import Header from "@/components/header";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { fetchStudentsWithoutGroup } from "@/lib/api/redux/studentWithoutGroupSlice";
import { PaginationDashboardPage } from "@/pages/admin/pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ManualCreateGroupDialog from "./create-group-button";
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import { ExportExcelGroupStudent } from "./export-excel-group-student";

export const GroupStudentCardPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const { groups, loading: groupsLoading, error: groupsError } = useAppSelector((state) => state.groups);
  const { students, loading: studentsLoading, error: studentsError } = useAppSelector(
    (state) => state.studentsWithoutGroup
  );

  const [currentPage, setCurrentPage] = useState(1);
 
  const itemsPerPage = 10;

  // Lọc các nhóm có isAutoCreated === false
  const filteredGroups = groups.filter((group) => group.isAutoCreated === false);
  const totalPages = filteredGroups.length > 0 ? Math.ceil(filteredGroups.length / itemsPerPage) : 1;

  // Lấy danh sách nhóm và sinh viên chưa có nhóm
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
      dispatch(fetchStudentsWithoutGroup(semesterId));
    }
  }, [dispatch, semesterId]);

  // Lấy các nhóm hiện tại sau khi lọc
  const currentGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  if (groupsLoading || studentsLoading) return <p>Đang tải dữ liệu...</p>;
  if (groupsError) return <p className="text-red-500">Lỗi: {groupsError}</p>;
  if (studentsError) return <p className="text-red-500">Lỗi khi tải danh sách sinh viên: {studentsError}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          <ExportExcelGroupStudent />
          <ManualCreateGroupDialog semesterId={semesterId!} students={students} />
        </div>
        <DataTable columns={columns} data={currentGroups} />
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