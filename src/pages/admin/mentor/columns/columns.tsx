import { ColumnDef } from "@tanstack/react-table";
import { Mentor } from "@/types/mentor";
import { Button } from "@/components/ui/button"; // Sử dụng Button từ thư viện UI
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Mentor, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.index + 1}</span>, // Dùng index thay vì id từ JSON
  },
  {
    accessorKey: "FullName",
    header: "Tên Mentor",
    cell: ({ row }) => <span>{row.getValue("FullName")}</span>,
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("Email")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem      
            >
              Sao chép ID sản phẩm
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

