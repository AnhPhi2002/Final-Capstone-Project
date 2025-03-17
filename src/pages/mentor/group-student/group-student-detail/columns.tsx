import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
// import { Action } from "./action"; // Import component Action
// import { useParams } from "react-router";

export type RoleType = "leader" | "member";

export interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  // role: RoleType;
  joinedAt: string;
  leaveAt: string | null;
  leaveReason: string | null;
  isActive: boolean;
  status: string;
  student: {
    id: string;
    studentCode: string;
    user: {
      username: string;
      email: string;
      profession: string;
      specialty: string;
    };
  };
    role:{
      id: string;
      name: RoleType;
    }
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
    accessorKey: "role.name",
    header: "Vai Trò",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge className={
          role.name === "leader" ? "bg-blue-100 text-blue-600 hover:bg-blue-200" :
          "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }>
          {role.name === "leader" ? "Trưởng Nhóm" : "Thành Viên"}
        </Badge>
      );
    },
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
          status === "ACTIVE" ? "bg-green-100 text-green-600 hover:bg-green-200" :
          status === "INACTIVE" ? "bg-red-100 text-red-600 hover:bg-red-200" :
          status === "LEFT" ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200" :
          "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }>
          {status === "ACTIVE" ? "Hoạt Động" : status === "INACTIVE" ? "Ngừng Hoạt Động" : "Đã Rời Nhóm"}
        </Badge>
      );
    },
  },
  // {
  //   id: "actions",
  //   header: "Hành Động",
  //   cell: ({ row }) => {
  //     const { semesterId } = useParams(); // ✅ Lấy semesterId từ URL
  //     return <Action groupId={row.original.groupId} semesterId={semesterId || ""} member={row.original} />;
  //   },
  // },
];
