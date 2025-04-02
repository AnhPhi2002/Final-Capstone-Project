// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilDefenseMember } from "@/lib/api/types";
import { Action } from "./action";

export const memberColumns: ColumnDef<CouncilDefenseMember>[] = [
  {
    accessorKey: "user.fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    id: "role.name", // id duy nhất cho cột
    accessorFn: (row) => row.role.name, // Hàm truy cập giá trị lồng nhau
    header: "Vai trò",
    cell: ({ row }) => {
      const roleName = row.original.role.name; // Truy cập trực tiếp từ row.original
      switch (roleName) {
        case "council_chairman":
          return "Chủ tịch";
        case "council_secretary":
          return "Thư ký";
        case "council_member":
          return "Thành viên";
        default:
          return roleName; // Giữ nguyên nếu không khớp
      }
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <Action councilId={row.original.councilId} userId={row.original.userId} />
    ),
  },
];