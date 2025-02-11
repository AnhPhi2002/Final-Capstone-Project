import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/students"; 

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "major_id",
    header: "Chuyên ngành",
    cell: ({ row }) => <span>{row.getValue("major_id")}</span>,
  },
  {
    accessorKey: "specialty_id",
    header: "Chuyên ngành hẹp ",
    cell: ({ row }) => <span>{row.getValue("specialty_id")}</span>,
  },
  {
    accessorKey: "block3w_status",
    header: "Trạng thái Block 3W",
    cell: ({ row }) => {
      const status = row.getValue("block3w_status");
      return (
        <Badge
          className={
            status === "Active"
              ? "bg-green-100 text-green-500"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-500"
              : "bg-gray-100 text-gray-500"
          }
        >
          {status as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "Qualified"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  
];
