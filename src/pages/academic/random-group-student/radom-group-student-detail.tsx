import Header from "@/components/header";
import { CreateRandomGroup } from "./create-random-group";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useParams } from "react-router";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { useEffect } from "react";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
export const RRadomGroupStudentDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const { groups, loading } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGroupsBySemester(semesterId));
    }
  }, [dispatch, semesterId]);
  return (
    <div className="flex flex-col h-screen">
    <Header title="Tổng quan" href="/" currentPage="Danh sách nhóm tạo ngẫu nhiên" />
    <div className="p-5 flex-1 overflow-auto">
       <div className="flex justify-end mb-4 gap-x-4">
        {semesterId && <CreateRandomGroup semesterId={semesterId} />}
      </div>
      {loading ? (
        <p className="text-center">Đang tải danh sách nhóm...</p>
      ) : groups.length > 0 ? (
        <DataTable columns={columns} data={groups} />
      ) : (
        <p className="text-center text-gray-500">Chưa có nhóm nào được tạo.</p>
      )} 
    
    </div>
  </div>
);
};
