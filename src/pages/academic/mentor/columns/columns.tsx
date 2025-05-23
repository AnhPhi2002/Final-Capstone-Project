import { ColumnDef } from "@tanstack/react-table";

import { Mentor } from '@/lib/api/types';
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Mentor>[] = [
  {
    accessorKey: "lecturerCode", // Định danh chính xác cho cột
    header: "Mã GV",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Tên giảng viên",
  },
  {
    accessorKey: "department",
    header: "Bộ phận",
  },
  {
    accessorKey: "departmentPosition",
    header: "Chuyên môn",
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          className={
            isActive
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
        >
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      );
    },
  },


];

