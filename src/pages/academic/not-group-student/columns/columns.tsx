import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { StudentNotGroup } from "@/lib/api/redux/types/not-group-student"; 

export const columns: ColumnDef<StudentNotGroup, unknown>[] = [
  {
    accessorKey: "studentCode",
    header: "MSSV",
    cell: ({ row }) => <span>{row.getValue("studentCode")}</span>,
  },
  {
    accessorKey: "email", 
    header: "Email",
    cell: ({ row }) => <span>{row.original.email || "N/A"}</span>,
  },
  {
    accessorKey: "major",
    header: "Ngành học",
    cell: ({ row }) => <span>{row.original.major || "N/A"}</span>,
  },
  {
    accessorKey: "specialization.name", 
    header: "Chuyên ngành hẹp",
    cell: ({ row }) => <span>{row.original.specialization || "N/A"}</span>,
  },
  {
    accessorKey: "qualificationStatus",
    header: "Điều kiện",
    cell: ({ row }) => {
      const status = row.getValue("qualificationStatus") as string;
  
      let badgeClass = "bg-gray-100 text-gray-500"; 
      let statusText = "Chưa xác định"; 
  
      if (status === "qualified") {
        badgeClass = "bg-green-100 text-green-500";
        statusText = "Đủ điều kiện";
      } else if (status === "not qualified") {
        badgeClass = "bg-red-100 text-red-500";
        statusText = "Không đđủ điều kiện";
      }
  
      return <Badge className={badgeClass}>{statusText}</Badge>;
    },
  }
,  
];
