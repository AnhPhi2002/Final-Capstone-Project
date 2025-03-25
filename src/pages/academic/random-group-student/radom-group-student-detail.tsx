import { useEffect, useState } from "react"; // Thêm useState để quản lý phân trang nếu cần
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"; // Thay useSelector bằng useAppSelector
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import Header from "@/components/header";
import { CreateRandomGroup } from "./create-random-group";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { PaginationDashboardPage } from "@/pages/admin/pagination";

export const RRadomGroupStudentDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const { groups, loading, error } = useAppSelector((state) => state.groups);

  // Thêm phân trang (tùy chọn, nếu bạn muốn giống GroupStudentCardPage)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lấy danh sách nhóm
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);

  // Lọc các nhóm có isAutoCreated === true
  const filteredGroups = groups.filter((group) => group.isAutoCreated === true);
  const totalPages = filteredGroups.length > 0 ? Math.ceil(filteredGroups.length / itemsPerPage) : 1;

  // Lấy các nhóm hiện tại sau khi lọc (nếu dùng phân trang)
  const currentGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm tạo ngẫu nhiên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          {semesterId && <CreateRandomGroup semesterId={semesterId} />}
        </div>
        <DataTable columns={columns} data={currentGroups} />
        {/* Nếu muốn thêm phân trang */}
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