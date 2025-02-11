import { ColumnDef } from "@tanstack/react-table";

interface StudentNotGroup {
  email: string;
  major_id: string;
  specialty_id: string;
  block3w_status: string;
  status: string;
}
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const columns: ColumnDef<StudentNotGroup>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "major_id",
    header: "Ngành học",
  },
  {
    accessorKey: "specialty_id",
    header: "Chuyên ngành",
  },
  {
    accessorKey: "block3w_status",
    header: "Block 3W",
    cell: ({ row }) => {
      const status = row.original.block3w_status;
      return (
        <Badge className={status === "Active" ? "bg-green-500" : "bg-gray-400"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      let badgeClass = "bg-gray-400";

      if (status === "Qualified") badgeClass = "bg-green-500";
      else if (status === "Pending") badgeClass = "bg-yellow-500";
      else if (status === "Rejected") badgeClass = "bg-red-500";

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(student.email);
                toast("Đã sao chép email.");
              }}
            >
              Sao chép email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              Xóa sinh viên
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
