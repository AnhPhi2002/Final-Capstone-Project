import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { StudentNotGroup } from "@/lib/api/redux/types/not-group-student"; 

export const columns: ColumnDef<StudentNotGroup, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "user.email", 
    header: "Email",
    cell: ({ row }) => <span>{row.original.user?.email || "N/A"}</span>,
  },
  {
    accessorKey: "major.name",
    header: "Ngành học",
    cell: ({ row }) => <span>{row.original.major|| "N/A"}</span>,
  },
  {
    accessorKey: "specialization.name", 
    header: "Chuyên ngành hẹp",
    cell: ({ row }) => <span>{row.original.specialization|| "N/A"}</span>,
  },
  {
    accessorKey: "status",
    header: "Điều kiện",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
  
      let badgeClass = "bg-gray-100 text-gray-500"; 
      let statusText = "Chưa xác định"; 
  
      if (status === "PENDING") {
        badgeClass = "bg-yellow-100 text-yellow-500";
        statusText = "Đang xử lý";
      } else if (status === "HAS_GROUP") {
        badgeClass = "bg-green-100 text-green-500";
        statusText = "Đã có nhóm";
      } else if (status === "NO_GROUP") {
        badgeClass = "bg-red-100 text-red-500";
        statusText = "Chưa có nhóm";
      }
  
      return <Badge className={badgeClass}>{statusText}</Badge>;
    },
  }
,  
];
