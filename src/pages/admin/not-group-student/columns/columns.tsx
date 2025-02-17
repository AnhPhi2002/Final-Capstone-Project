import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { StudentNotGroup } from "@/types/not-group-student"; // Đường dẫn đúng với tệp types.ts

export const columns: ColumnDef<StudentNotGroup>[] = [
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
    header: "Ngành học",
    cell: ({ row }) => <span>{row.getValue("major_id")}</span>,
  },
  {
    accessorKey: "specialty_id",
    header: "Chuyên ngành hẹp",
    cell: ({ row }) => <span>{row.getValue("specialty_id")}</span>,
  },
  {
    accessorKey: "status",
    header: "Điều kiện",
    cell: ({ row }) => {
      const qualificationStatus = row.getValue("status") as string;
      return (
        <Badge
          className={
            qualificationStatus === "Qualified"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
        >
          {qualificationStatus === "Qualified" ? "Đạt" : "Không đạt"}
        </Badge>
      );
    },
  },

];
