import React, { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail} from "@/lib/api/redux/groupDetailSlice";
import { columns } from "./group-student-detail/columns";
import { DataTable } from "./group-student-detail/data-table";
import { useParams } from "react-router";

interface DataTableGroupTopicProps {
  groupId?: string;
  // semesterId?: string;
}

export const DataTableGroupTopic: React.FC<DataTableGroupTopicProps> = ({groupId}) =>{
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);
  const {semesterId} = useParams();

  useEffect(() => {
    if (groupId && semesterId) {
      dispatch(fetchGroupDetail({groupId, semesterId}));
    }
  }, [dispatch, groupId, semesterId]);

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold">Danh sách nhóm ({group?.groupCode})</h2>
      <DataTable columns={columns} data={group?.members || []} />
    </div>
  );
};

