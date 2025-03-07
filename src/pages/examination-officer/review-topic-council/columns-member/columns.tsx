import { ColumnDef } from "@tanstack/react-table";
import { CouncilMember } from "@/lib/api/types";

export const columnsCouncilMembers: ColumnDef<CouncilMember, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <span className={row.original.status === "ACTIVE" ? "text-green-600" : "text-red-600"}>
        {row.original.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
      </span>
    ),
  },
];
