// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { CouncilReviewMember } from "@/lib/api/types";
import { Action } from "./action";

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
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <Action councilId={row.original.councilId} userId={row.original.userId} />
    ),
  },
];