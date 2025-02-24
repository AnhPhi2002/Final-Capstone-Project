import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Action } from "./action"; // Import component Action

export type RoleType = "leader" | "member";

export interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  role: RoleType;
  joinedAt: string;
  leaveAt: string | null;
  leaveReason: string | null;
  isActive: boolean;
  status: string;
  student: {
    studentCode: string;
    user: {
      username: string;
      email: string;
      profession: string;
      specialty: string;
    };
  };
}

export const columns: ColumnDef<GroupMember>[] = [
  {
    accessorKey: "student.studentCode",
    header: "Mã Sinh Viên",
    cell: ({ row }) => <div>{row.original.student.studentCode}</div>,
  },
  {
    accessorKey: "student.user.username",
    header: "Tên Sinh Viên",
    cell: ({ row }) => <div>{row.original.student.user.username}</div>,
  },
  {
    accessorKey: "student.user.email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.student.user.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Vai Trò",
    cell: ({ row }) => (
      <Badge className={row.original.role === "leader" ? "bg-blue-100 text-blue-500" : "bg-gray-100 text-gray-500"}>
        {row.original.role === "leader" ? "Trưởng Nhóm" : "Thành Viên"}
      </Badge>
    ),
  },
  {
    accessorKey: "student.user.profession",
    header: "Ngành Học",
    cell: ({ row }) => <div>{row.original.student.user.profession}</div>,
  },
  {
    accessorKey: "student.user.specialty",
    header: "Chuyên Ngành",
    cell: ({ row }) => <div>{row.original.student.user.specialty}</div>,
  },
  {
    accessorKey: "joinedAt",
    header: "Ngày Tham Gia",
    cell: ({ row }) => <div>{new Date(row.original.joinedAt).toLocaleString()}</div>,
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className={
          status === "ACTIVE" ? "bg-green-100 text-green-500" :
          status === "INACTIVE" ? "bg-red-100 text-red-500" :
          status === "LEFT" ? "bg-yellow-100 text-yellow-500" :
          "bg-gray-100 text-gray-500"
        }>
          {status === "ACTIVE" ? "Hoạt Động" : status === "INACTIVE" ? "Ngừng Hoạt Động" : "Đã Rời Nhóm"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Hành Động",
    cell: ({ row }) => <Action groupId={row.original.groupId} member={row.original} />,
  },
];
