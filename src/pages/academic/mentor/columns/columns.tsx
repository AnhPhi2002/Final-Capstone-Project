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
    accessorKey: "fullName",
    header: "Tên giảng viên",
  },
  {
    accessorKey: "department",
    header: "Chuyên môn",
  },
  {
    accessorKey: "departmentPosition",
    header: "Bộ môn",
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

