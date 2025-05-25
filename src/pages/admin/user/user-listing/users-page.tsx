import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
// import { User } from "@/types/user";
import ToolsPanel from "./tools-panel";
import { fetchUsers } from "@/lib/api/redux/userSlice";

const UsersListingPage = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading, error } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolsPanel />
        <DataTable columns={columns} data={filteredUsers} />
      </div>
    </div>
  );
};

export default UsersListingPage;