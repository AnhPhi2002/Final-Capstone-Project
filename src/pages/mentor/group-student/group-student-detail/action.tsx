import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { fetchGroupDetail, removeMemberFromGroup, toggleMemberStatus } from "@/lib/api/redux/groupDetailSlice";
import { useState } from "react";
import { toast } from "sonner";
import { GroupMember } from "@/lib/api/redux/groupDetailSlice";
import { useParams } from "react-router";

interface ActionProps {
  groupId: string;
  member: GroupMember;
  groupCode: string;
}

export const Action = ({ groupId, member, groupCode }: ActionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { semesterId } = useParams<{ semesterId: string }>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveMember = async () => {
    if (!semesterId) {
      toast.error("Lỗi: Thiếu semesterId");
      return;
    }

    setIsProcessing(true);
    try {
      await dispatch(removeMemberFromGroup({ groupId, studentId: member.studentId, semesterId })).unwrap();
      toast.success(`Đã xóa ${member.student.user.username} khỏi nhóm!`);
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xóa thành viên!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!semesterId) {
      toast.error("Lỗi: Thiếu semesterId");
      return;
    }
  
    setIsProcessing(true);
    const newStatus = member.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  
    try {
      await dispatch(
        toggleMemberStatus({
          groupCode,
          memberEmail: member.student.user.email,
          newStatus,
          semesterId,
        })
      ).unwrap();
  
      // toast.success(`Cập nhật trạng thái thành công: ${newStatus === "ACTIVE" ? "Hoạt động" : "Ngừng hoạt động"}`);
  
      // ✅ Chỉ fetch lại dữ liệu nếu cập nhật thành công
      dispatch(fetchGroupDetail({ groupId, semesterId }));
    } catch (error: any) {
      // const errorMessage = error?.message || "Lỗi hệ thống khi cập nhật trạng thái!";
      // toast.error(errorMessage); // ✅ Lấy lỗi từ API giống Postman
    } finally {
      setIsProcessing(false);
    }
  };
  
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 min-w-8 p-0 flex items-center justify-center">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Hành Động</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToggleStatus} disabled={isProcessing}>
          {member.status === "ACTIVE" ? "Ngừng Hoạt Động" : "Kích Hoạt"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={handleRemoveMember} disabled={isProcessing}>
          Xóa thành viên
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
