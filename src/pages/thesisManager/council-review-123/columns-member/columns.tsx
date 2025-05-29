// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilReviewMember } from "@/lib/api/types";
import { Action } from "./action";
import { Badge } from "@/components/ui/badge";

export const memberColumns: ColumnDef<CouncilReviewMember>[] = [
  {
    accessorKey: "user.fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "roleName",
    header: "Vai trò",
    cell: ({ row }) => {
      const roleName = row.getValue("roleName") as string | null;
      return roleName === "council_member" ? "Thành viên" : roleName || "Không xác định";
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge className={row.original.status === "ACTIVE" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}>
        {row.original.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
      </Badge>
    )
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <Action councilId={row.original.councilId} userId={row.original.userId} />
    ),
  },
];