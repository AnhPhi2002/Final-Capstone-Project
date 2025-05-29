// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilReviewMember } from "@/lib/api/types";
import { Badge } from "@/components/ui/badge";
// import { Action } from "./action";

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