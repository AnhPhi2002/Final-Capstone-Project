import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsWithoutSemester } from "@/lib/api/redux/groupSlice";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { PaginationDashboardPage } from "../pagination";

export const GroupStudentDefenseCardPage = () => {
  const dispatch = useAppDispatch();
  const { groupsDetails, loading, error } = useAppSelector((state) => state.groups);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages =
    Array.isArray(groupsDetails) && groupsDetails.length > 0
      ? Math.ceil(groupsDetails.length / itemsPerPage)
      : 1;

  useEffect(() => {
    dispatch(fetchGroupsWithoutSemester());
  }, [dispatch]);

  const currentGroups = Array.isArray(groupsDetails)
    ? groupsDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  if (loading) return <p>Đang tải danh sách nhóm...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          {/* <CreateGroup key={totalPages} /> */}
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
