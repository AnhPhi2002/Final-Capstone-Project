import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Action } from "./action"; // Import component Action
import { GroupMember } from "@/lib/api/redux/groupDetailSlice"; // ✅ Đảm bảo import từ Redux

export const columns = (groupCode: string): ColumnDef<GroupMember>[] => [
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
    accessorKey: "student.user.profession",
    header: "Ngành",
    cell: ({ row }) => <div>{row.original.student.user.profession}</div>,
  },
    {
    accessorKey: "role.name",
    header: "Vai Trò",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge className={role.name === "leader" ? "bg-blue-100 text-blue-600 hover:bg-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}>
          {role.name === "leader" ? "Trưởng Nhóm" : "Thành Viên"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className={status === "ACTIVE" ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-red-100 text-red-600 hover:bg-red-200"}>
          {status === "ACTIVE" ? "Hoạt Động" : "Ngừng Hoạt Động"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Hành Động",
    cell: ({ row }) => {
      const member = row.original;
      return <Action groupId={member.groupId} groupCode={groupCode} member={member} />;
    },
  },
];



