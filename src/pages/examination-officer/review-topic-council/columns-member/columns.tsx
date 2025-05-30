import { ColumnDef } from "@tanstack/react-table";
import { CouncilMember } from "@/lib/api/types";
import { ActionMenuMember } from "./action";
import { Badge } from "@/components/ui/badge";

export const columnsCouncilMembers: ColumnDef<CouncilMember, any>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "user.username",
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
      const roleName = row.getValue("roleName") as string;
      return roleName === "council_member" ? "Thành viên" : roleName;
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
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <ActionMenuMember
        data={row.original} // Change 'council' to 'data' to match ActionMenuProps
        refetchData={() => {}} // Hàm refetchData nếu cần
      />
    ),
  },
];