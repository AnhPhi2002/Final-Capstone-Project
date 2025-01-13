import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Họ và tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Số điện thoại
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Vai trò
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      switch (user.role) {
        case "Admin":
          return <Badge className="bg-blue-600 hover:bg-blue-500">Admin</Badge>;
        case "Academic Officer":
          return (
            <Badge className="bg-purple-600 hover:bg-purple-500">
              Cán bộ học vụ
            </Badge>
          );
        case "Graduation Thesis Manager":
          return (
            <Badge className="bg-teal-600 hover:bg-teal-500">
              Quản lý luận văn
            </Badge>
          );
        case "Examination Officer":
          return (
            <Badge className="bg-red-600 hover:bg-red-500">Cán bộ thi cử</Badge>
          );
        case "Mentors":
          return (
            <Badge className="bg-yellow-600 hover:bg-yellow-500">
              Giảng viên
            </Badge>
          );
        case "Student":
          return (
            <Badge className="bg-green-600 hover:bg-green-500">Sinh viên</Badge>
          );
        default:
          return (
            <Badge className="bg-gray-600 hover:bg-gray-500">
              Vai trò không xác định
            </Badge>
          );
      }
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 m-0 w-full justify-start"
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      if (user.status == "Active") {
        return (
          <Badge className="text-green-500 bg-green-100 border-green-500 hover:bg-green-200">
            Đã kích hoạt
          </Badge>
        );
      }
      if (user.status == "Inactive") {
        return (
          <Badge className="text-red-500 bg-red-100 border-red-500 hover:bg-red-200">
            Đã hủy kích hoạt
          </Badge>
        );
      }
      return <Badge variant="outline">{user.status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() => {
                navigator.clipboard.writeText(user.id.toString());
                toast("Đã sao chép.");
              }}
            >
              Sao chép ID tài khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/product/${user.id}`}>Xem chi tiết tải khoản</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/product/${user.id}/edit`}>Cập nhật thông tin</Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Thay đổi trạng thái
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Kích hoạt</DropdownMenuItem>
                  <DropdownMenuItem>Hủy kích hoạt</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              Xóa tài khoản
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
