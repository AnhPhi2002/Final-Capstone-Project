import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsBySemester } from "@/lib/api/redux/studentSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/header";
import ToolPanel from "./tool-panel";

export const StudentsDetailPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchStudentsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Danh sách sinh viên" href="/" currentPage="Chi tiết danh sách sinh viên trong kỳ" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <h1 className="text-xl font-bold">Đang tải dữ liệu...</h1>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-48">
            <h1 className="text-xl font-bold">Lỗi: {error}</h1>
          </div>
        ) : (
          <DataTable columns={columns} data={students.length > 0 ? students : []} />
        )}
      </div>
    </div>
  );
};
