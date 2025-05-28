import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import ToolsPanel from "./tools-panel";
import { fetchUsers, filterUsers } from "@/lib/api/redux/userSlice";
import { PaginationDashboardPage } from "../../pagination";
import { columns as getColumns } from "./columns";
import { toast } from "sonner";

const UsersListingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { semesterId } = useParams<{ semesterId: string }>();
  const { filteredUsers = [], loading, error } = useSelector((state: any) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("*");

  // Redirect if no semesterId
  useEffect(() => {
    if (!semesterId) {
      toast.error("Không tìm thấy học kỳ. Vui lòng chọn một học kỳ.");
    }
  }, [semesterId, navigate]);

  // Fetch users when semesterId changes
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchUsers({ semesterId }) as any);
    }
  }, [dispatch, semesterId]);

  // Reset currentPage when searchText, filterRole, or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filterRole, itemsPerPage]);

  // Filter users based on search and role
  useEffect(() => {
    dispatch(filterUsers({ search: searchText, role: filterRole }));
  }, [searchText, filterRole, dispatch]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers.length, itemsPerPage]);

  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);
  const columns = useMemo(() => getColumns({ currentPage, itemsPerPage, semesterId: semesterId! }), [currentPage, itemsPerPage, semesterId]);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        {loading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : error ? (
          <div className="text-center text-red-500">Lỗi: {error}</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500">Không có người dùng nào trong học kỳ này</div>
        ) : (
          <>
            <ToolsPanel
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              onSearchChange={setSearchText}
              onFilterChange={setFilterRole}
               semesterId={semesterId!}
            />
            <DataTable columns={columns} data={currentUsers} />
            <div className="flex justify-end mt-6">
              <PaginationDashboardPage
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => {
                  if (page >= 1 && page <= totalPages) setCurrentPage(page);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersListingPage;