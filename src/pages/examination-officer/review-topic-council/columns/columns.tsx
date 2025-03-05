import { ColumnDef } from "@tanstack/react-table";
import { Lecturer } from "@/types/Lecturer";
import { ActionMenu } from "./action";


export const columnsLecturer: ColumnDef<Lecturer, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "lecturerCode",
    header: "Mã giảng viên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fullName",
    header: "Họ và tên",
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => (
      <span className={row.original.isActive ? "text-green-600" : "text-red-600"}>
        {row.original.isActive ? "Hoạt động" : "Không hoạt động"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <ActionMenu lecturer={row.original} />, // Truyền lecturer vào Action
  },
];
