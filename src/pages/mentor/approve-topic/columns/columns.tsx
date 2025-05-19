import { ColumnDef } from "@tanstack/react-table";
import { ApproveTopic } from "@/lib/api/redux/types/topic";
import { ActionMenu } from "./action";
import { GroupCodeCell } from "./GroupCodeCell";

// ✅ Cấu hình cột
export const columnsApproveTopic: ColumnDef<ApproveTopic, any>[] = [
  { accessorKey: "registrationId", header: "ID Đăng ký" },
  // { accessorKey: "groupCode", header: "Mã Nhóm", cell: ({ row }) => row.original.groupCode || "Chưa có" },

  {
    accessorKey: "groupCode",
    header: "Mã Nhóm",
    cell: ({ row }) => (
      <GroupCodeCell 
        groupId={row.original.groupId} 
        groupCode={row.original.groupCode || "Chưa có"} 
      />
    ),
  },
  { accessorKey: "nameEn", header: "Tên Đề Tài" },
  { accessorKey: "description", header: "Mô Tả" },
  { accessorKey: "userEmail", header: "Email Người Đăng Ký" },
  { accessorKey: "leaderRole", header: "Vai Trò" },
  {
    accessorKey: "registrationStatus",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.registrationStatus;
      return (
        <span className={
          status === "APPROVED" ? "text-green-600" :
          status === "REJECTED" ? "text-red-600" :
          "text-yellow-500"
        }>
          {status === "APPROVED" ? "Chấp nhận" :
           status === "REJECTED" ? "Từ chối" :
           "Đang xử lý"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => (
      <ActionMenu approvetopic={{
        registrationId: row.original.registrationId
      }} />
    ),
  },
];

