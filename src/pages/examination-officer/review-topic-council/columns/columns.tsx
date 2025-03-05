import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Lecturer } from "@/types/Lecturer"; // Import kiểu dữ liệu Lecturer

export const columns: ColumnDef<Lecturer, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "lecturerCode",
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
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge className={isActive ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}>
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      );
    },
  },
];
