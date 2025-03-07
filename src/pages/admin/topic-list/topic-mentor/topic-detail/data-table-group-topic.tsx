import React, { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail} from "@/lib/api/redux/groupDetailSlice";
import { columns } from "./group-student-detail/columns";
import { DataTable } from "./group-student-detail/data-table";

interface DataTableGroupTopicProps {
  groupId?: string;
}

export const DataTableGroupTopic: React.FC<DataTableGroupTopicProps> = ({groupId}) =>{
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroupDetail(groupId));
    }
  }, [dispatch, groupId]);

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold">Danh sách nhóm ({group?.groupCode})</h2>
      <DataTable columns={columns} data={group?.members || []} />
    </div>
  );
};

