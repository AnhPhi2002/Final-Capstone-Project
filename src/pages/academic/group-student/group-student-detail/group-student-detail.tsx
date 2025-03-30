import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import { inviteMember } from "@/lib/api/redux/groupInviteSlice";
import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const GroupStudentDetail = () => {
  const { groupId, semesterId } = useParams<{ groupId: string; semesterId: string }>();
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (groupId && semesterId) {
      dispatch(fetchGroupDetail({ groupId, semesterId }));
    }
  }, [dispatch, groupId, semesterId]);

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error("Vui lòng nhập email!");
      return;
    }
    try {
      await dispatch(inviteMember({ groupId: groupId!, email })).unwrap();
      toast.success("Mời thành viên thành công!");
      setEmail("");
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi mời thành viên!");
    }
  };

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Danh sách nhóm sinh viên" href="/" currentPage="Chi tiết nhóm" />
      <div className="p-5 flex-1 overflow-auto">
        {group ? (
          <>
            <h2 className="text-xl font-bold mb-4">Mã Nhóm: {group.groupCode}</h2>
            <div className="mb-4 flex gap-4">
              <Input placeholder="Nhập email thành viên" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button onClick={handleInvite} className="bg-blue-500 text-white">
                Mời thành viên
              </Button>
            </div>
            <DataTable columns={columns} data={group.members} />
          </>
        ) : (
          <p>Không tìm thấy nhóm</p>
        )}
      </div>
    </div>
  );
};
