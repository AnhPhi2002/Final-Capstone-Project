import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import Header from "@/components/header";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import CreateGroup from "./create-group-button";
import { ExportExcelGroupStudent } from "./export-excel-group-student";

export const GroupStudentCardPage = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { groups, loading, error } = useAppSelector((state) => state.groups);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);

  console.log("Groups Data:", groups);

  if (loading) return <p>Đang tải danh sách nhóm...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm sinh viên" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mb-4 gap-x-4">
          <ExportExcelGroupStudent />
          <CreateGroup key={groups.length} semesterId={semesterId!}/>
        </div>
        <DataTable columns={columns} data={groups} />
      </div>
    </div>
  );
};
