// src/components/columns.tsx (cho thành viên)
import { ColumnDef } from "@tanstack/react-table";
import { CouncilDefenseMember } from "@/lib/api/redux/types/defenseSchedule";
import { Badge } from "@/components/ui/badge";

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
    cell: ({ row }) => (
      <Badge className={row.original.status === "ACTIVE" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-300"}>
        {row.original.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
      </Badge>
    ),
  },
];