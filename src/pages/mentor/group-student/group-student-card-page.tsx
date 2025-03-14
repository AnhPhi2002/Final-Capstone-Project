import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import Header from "@/components/header";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import CreateGroup from "./create-group-button";
import { ExportExcelGroupStudent } from "./export-excel-group-student";
import { PaginationDashboardPage } from "../pagination";

export const GroupStudentCardPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const { groups, loading, error } = useAppSelector((state) => state.groups);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const totalPages = groups.length > 0 ? Math.ceil(groups.length / itemsPerPage) : 1;

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);

  const currentGroups = groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("Groups Data:", groups);

  if (loading) return <p>Đang tải danh sách nhóm...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          <ExportExcelGroupStudent />
          <CreateGroup key={groups.length} semesterId={semesterId!} />
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
