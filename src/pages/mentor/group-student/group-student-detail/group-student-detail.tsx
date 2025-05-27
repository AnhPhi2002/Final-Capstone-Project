import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const GroupStudentDetail = () => {
  const { groupId, semesterId } = useParams<{ groupId: string; semesterId: string }>();
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);

  useEffect(() => {
    if (groupId && semesterId) {
      dispatch(fetchGroupDetail({ groupId, semesterId }));
    }
  }, [dispatch, groupId, semesterId]);

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết nhóm" href="" currentPage="Chi tiết nhóm" />
      <div className="p-5 flex-1 overflow-auto">
        {group ? (
          <>
            <h2 className="text-xl font-bold mb-4">Mã Nhóm: {group.groupCode}</h2>
            <DataTable columns={columns(group.groupCode)} data={group.members} />
          </>
        ) : (
          <p>Không tìm thấy nhóm</p>
        )}
      </div>
    </div>
  );
};
