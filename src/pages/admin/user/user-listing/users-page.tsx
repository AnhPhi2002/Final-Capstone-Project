import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import ToolsPanel from "./tools-panel";
import { fetchUsers, filterUsers } from "@/lib/api/redux/userSlice";
import { PaginationDashboardPage } from "../../pagination";
import { columns as getColumns } from "./columns";

const UsersListingPage = () => {
  const dispatch = useDispatch();
  const { filteredUsers = [], loading, error } = useSelector((state: any) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("*");

  // Fetch users khi mount
  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  // Reset currentPage khi searchText, filterRole hoặc itemsPerPage thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filterRole, itemsPerPage]);

  // Khi search hoặc role thay đổi, dispatch filterUsers
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

  const columns = useMemo(() => getColumns({ currentPage, itemsPerPage }), [currentPage, itemsPerPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          onSearchChange={setSearchText}
          onFilterChange={setFilterRole}
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
      </div>
    </div>
  );
};

export default UsersListingPage;
