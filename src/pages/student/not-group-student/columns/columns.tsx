import { ColumnDef } from "@tanstack/react-table";
import { StudentNotGroupForStudent } from "@/lib/api/redux/types/not-group-student"; 

export const columns: ColumnDef<StudentNotGroupForStudent>[] = [
  {
    accessorKey: "studentId", 
    header: "Mã sinh viên",
    cell: ({ row }) => <span>{row.original.studentId}</span>,
  },
  {
    accessorKey: "fullName", 
    header: "Họ và Tên",
    cell: ({ row }) => <span>{row.original.fullName}</span>,
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
