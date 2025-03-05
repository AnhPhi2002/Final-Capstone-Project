import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button"; // Sử dụng Button từ thư viện UI
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
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
    accessorKey: "role",
    header: "Chức vụ",
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

  // {
  //   id: "actions",
  //   cell: () => {

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
  //           <DropdownMenuItem      
  //           >
  //             Sao chép ID sản phẩm
  //           </DropdownMenuItem>
  //           <DropdownMenuItem className="text-red-500">
  //             Xóa sản phẩm
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

