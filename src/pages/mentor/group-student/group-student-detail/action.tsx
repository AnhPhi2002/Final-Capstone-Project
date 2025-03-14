import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { changeLeader, fetchGroupDetail, removeMemberFromGroup } from "@/lib/api/redux/groupDetailSlice";
import { useState } from "react";
import { toast } from "sonner";
import { GroupMember } from "@/lib/api/redux/groupDetailSlice";

interface ActionProps {
  groupId: string;
  member: GroupMember;
  semesterId: string;
}

export const Action = ({ groupId, semesterId, member }: ActionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const setIsProcessing = useState(false)[1];
  // const [isProcessing, setIsProcessing] = useState(false);
  const handleChangeRole = async () => {
    setIsProcessing(true);
    try {
      await dispatch(changeLeader({ groupId, newLeaderId: member.studentId , semesterId})).unwrap();
      toast.success(`Đã đổi ${member.student.user.username} thành Trưởng nhóm!`);
      dispatch(fetchGroupDetail({ groupId, semesterId }));
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi đổi vai trò!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveMember = async () => {
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Thay đổi vai trò</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {member.role.name !== "leader" && <DropdownMenuItem onClick={handleChangeRole}>Trưởng nhóm</DropdownMenuItem>}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={handleRemoveMember}>
          Xóa thành viên
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
