import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import { inviteMember } from "@/lib/api/redux/groupInviteSlice"; // Import API mời
import Header from "@/components/header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const GroupStudentDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);
  const [studentId, setStudentId] = useState(""); // State cho input

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroupDetail(groupId));
    }
  }, [dispatch, groupId]);

  const handleInvite = async () => {
    if (!studentId.trim()) {
      toast.error("Vui lòng nhập mã sinh viên!");
      return;
    }
  
    try {
      await dispatch(inviteMember({ groupId: groupId!, studentId })).unwrap();
      toast.success("Mời thành viên thành công!");
      setStudentId(""); // Reset input sau khi mời
    } catch (error: any) {
      console.error("Lỗi mời thành viên:", error);
  
      // Kiểm tra nếu API trả về thông báo lỗi
      const errorMessage = typeof error === "string" ? error : error?.message || "Lỗi khi mời thành viên!";
      
      toast.error(errorMessage);
    }
  };
  

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Chi tiết nhóm" href="/" currentPage="Chi tiết nhóm" />
      <div className="p-5 flex-1 overflow-auto">
        {group ? (
          <>
            <h2 className="text-xl font-bold mb-4">Mã Nhóm: {group.groupCode}</h2>
            
            {/* Mời thành viên */}
            <div className="mb-4 flex gap-4">
              <Input
                placeholder="Nhập mã sinh viên"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
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
