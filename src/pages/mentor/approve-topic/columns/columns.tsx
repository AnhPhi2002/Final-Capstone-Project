import { ColumnDef } from "@tanstack/react-table";
import { ApproveTopic } from "@/types/ApproveTopic";
import { ActionMenu } from "./action";

// ✅ Cột hiển thị trong bảng
export const columnsApproveTopic: ColumnDef<ApproveTopic, any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "groupCode", header: "Mã Nhóm" },
  { accessorKey: "topic.nameEn", header: "Tên đề tài" },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => (
      <span className={row.original.isActive ? "text-green-600" : "text-red-600"}>
        {row.original.isActive ? "Chấp nhận" : "Từ chối"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <ActionMenu approvetopic={row.original} />, // ✅ Fix lỗi truyền dữ liệu vào ActionMenu
  },
];
