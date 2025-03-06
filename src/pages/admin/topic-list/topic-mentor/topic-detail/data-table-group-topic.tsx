import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchGroupDetail, changeLeader, removeMemberFromGroup } from "@/lib/api/redux/groupDetailSlice";
import { inviteMember } from "@/lib/api/redux/groupInviteSlice";
import { toast } from "sonner";
import { columns, GroupMember } from "./group-student-detail/columns";
import { DataTable } from "./group-student-detail/data-table";

export const DataTableGroupTopic = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const { group, loading, error } = useAppSelector((state) => state.groupDetail);
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroupDetail(groupId));
    }
  }, [dispatch, groupId]);

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

  const handleChangeRole = async (member: GroupMember) => {
    setIsProcessing(true);
    try {
      await dispatch(changeLeader({ groupId: groupId!, newLeaderId: member.studentId })).unwrap();
      toast.success(`Đã đổi ${member.student.user.username} thành Trưởng nhóm!`);
      dispatch(fetchGroupDetail(groupId!));
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi đổi vai trò!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveMember = async (member: GroupMember) => {
    setIsProcessing(true);
    try {
      await dispatch(removeMemberFromGroup({ groupId: groupId!, studentId: member.studentId })).unwrap();
      toast.success(`Đã xóa ${member.student.user.username} khỏi nhóm!`);
      dispatch(fetchGroupDetail(groupId!));
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xóa thành viên!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <p>Đang tải thông tin nhóm...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {group ? (
        <DataTable columns={columns} data={group.members} />
      ) : (
        <DataTable columns={columns} data={sampleGroupMembers} />
      )}
    </div>
  );
};

// Dữ liệu mẫu để test giao diện
export const sampleGroupMembers: GroupMember[] = [
  {
    id: "1",
    groupId: "group-001",
    studentId: "student-001",
    role: "leader",
    joinedAt: "2024-01-10T09:00:00Z",
    leaveAt: null,
    leaveReason: null,
    isActive: true,
    status: "ACTIVE",
    student: {
      id: "student-001",
      studentCode: "SV2024001",
      user: {
        username: "NguyenVanA",
        email: "nguyenvana@example.com",
        profession: "CNTT",
        specialty: "Kỹ thuật phần mềm",
      },
    },
  },
  {
    id: "2",
    groupId: "group-001",
    studentId: "student-002",
    role: "member",
    joinedAt: "2024-01-12T10:30:00Z",
    leaveAt: null,
    leaveReason: null,
    isActive: true,
    status: "ACTIVE",
    student: {
      id: "student-002",
      studentCode: "SV2024002",
      user: {
        username: "TranThiB",
        email: "tranthib@example.com",
        profession: "CNTT",
        specialty: "Hệ thống thông tin",
      },
    },
  },
  {
    id: "3",
    groupId: "group-001",
    studentId: "student-003",
    role: "member",
    joinedAt: "2024-01-15T14:45:00Z",
    leaveAt: "2024-02-20T12:00:00Z",
    leaveReason: "Bận công việc cá nhân",
    isActive: false,
    status: "LEFT",
    student: {
      id: "student-003",
      studentCode: "SV2024003",
      user: {
        username: "LeVanC",
        email: "levanc@example.com",
        profession: "CNTT",
        specialty: "Mạng máy tính",
      },
    },
  },
];
