import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchStudentsWithoutGroup } from "@/lib/api/redux/studentWithoutGroupSlice";
import { useParams } from "react-router";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ToolPanel from "./tool-panel";

export const NotGroupStudentDetailPage = () => {
  const dispatch = useAppDispatch();
  const { semesterId } = useParams<{ semesterId: string }>();

  const { students, loading, error } = useAppSelector(
    (state) => state.studentsWithoutGroup
  );
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchStudentsWithoutGroup(semesterId));
    }
  }, [dispatch, semesterId]);

  console.log("Students Data from Redux:", students); // ✅ Kiểm tra Redux có nhận dữ liệu hay không

  if (loading) return <p>Đang tải danh sách sinh viên...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách sinh viên chưa có nhóm KLTN" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        <DataTable columns={columns} data={students} />
      </div>
    </div>
  );
};
