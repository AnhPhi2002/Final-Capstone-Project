import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/api/redux/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/lib/api/redux/userSlice";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Họ và tên
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.username || "N/A",
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Vai trò
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const roleDescription = row.original.roles[0]?.role?.description || "Không xác định";
      switch (roleDescription) {
        case "Giảng viên":
          return <Badge className="bg-yellow-600 hover:bg-yellow-500">Giảng viên</Badge>;
        case "Sinh viên (Student Groups/Students)":
          return <Badge className="bg-green-600 hover:bg-green-500">Sinh viên</Badge>;
        case "Admin":
          return <Badge className="bg-blue-600 hover:bg-blue-500">Admin</Badge>;
        case "Cán bộ học vụ":
          return <Badge className="bg-purple-600 hover:bg-purple-500">Cán bộ học vụ</Badge>;
        case "Quản lý luận văn":
          return <Badge className="bg-teal-600 hover:bg-teal-500">Quản lý luận văn</Badge>;
        case "Cán bộ thi cử":
          return <Badge className="bg-red-600 hover:bg-red-500">Cán bộ thi cử</Badge>;
        default:
          return <Badge className="bg-gray-600 hover:bg-gray-500">{roleDescription}</Badge>;
      }
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Trạng thái
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isActive = row.original.roles[0]?.role?.isActive;
      if (isActive === true) {
        return (
          <Badge className="text-green-500 bg-green-100 border-green-500 hover:bg-green-200">
            Đang hoạt động
          </Badge>
        );
      }
      if (isActive === false) {
        return (
          <Badge className="text-red-500 bg-red-100 border-red-500 hover:bg-red-200">
            Không hoạt động
          </Badge>
        );
      }
      return <Badge className="bg-gray-600 hover:bg-gray-500">Không xác định</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const dispatch = useDispatch();

      const handleDelete = async () => {
        if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
          const result = await dispatch(deleteUser(user.id) as any);
          if (deleteUser.fulfilled.match(result)) {
            toast.success("Xóa tài khoản thành công");
          } else {
            toast.error(result.payload || "Xóa tài khoản thất bại");
          }
        }
      };

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
                navigator.clipboard.writeText(user.id);
                toast("Đã sao chép.");
              }}
            >
              Sao chép ID tài khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/admin/user/${user.id}`}>Xem chi tiết tài khoản</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/admin/user/update-user/${user.id}/edit`}>Cập nhật thông tin</Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Thay đổi trạng thái</DropdownMenuSubTrigger>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Xóa tài khoản
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];