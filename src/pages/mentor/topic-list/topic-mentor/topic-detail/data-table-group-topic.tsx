import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import { columns } from "./group-student-detail/columns";
import { DataTable } from "./group-student-detail/data-table";
import { useParams } from "react-router";

interface DataTableGroupTopicProps {
  groupId?: string;
}

export const DataTableGroupTopic: React.FC<DataTableGroupTopicProps> = ({ groupId }) => {
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);
  const { semesterId } = useParams<{ semesterId?: string }>();

  useEffect(() => {
    if (groupId && semesterId) {
      console.log("Fetching group detail with groupId:", groupId, "semesterId:", semesterId); // Debug
      dispatch(fetchGroupDetail({ groupId, semesterId }));
    }
  }, [dispatch, groupId, semesterId]);

  if (!groupId || !semesterId) {
    return <p className="text-gray-500">Không có thông tin nhóm hoặc học kỳ để hiển thị</p>;
  }

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!group) {
    return <p className="text-gray-500">Không tìm thấy thông tin nhóm</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Danh sách nhóm ({group.groupCode})</h2>
      <DataTable columns={columns} data={group.members || []} />
    </div>
  );
};