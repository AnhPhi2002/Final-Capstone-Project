import { ColumnDef } from "@tanstack/react-table";
import { StudentNotGroupForStudent } from "@/lib/api/redux/types/not-group-student"; 

export const columns: ColumnDef<StudentNotGroupForStudent>[] = [
  {
    accessorKey: "studentCode", 
    header: "Mã sinh viên",
    cell: ({ row }) => <span>{row.original.studentCode}</span>,
  },
  {
    accessorKey: "studentName", 
    header: "Họ và Tên",
    cell: ({ row }) => <span>{row.original.studentName}</span>,
  },
  {
    accessorKey: "email", 
    header: "Email",
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "major",
    header: "Ngành học",
    cell: ({ row }) => <span>{row.original.major}</span>,
  },
];
