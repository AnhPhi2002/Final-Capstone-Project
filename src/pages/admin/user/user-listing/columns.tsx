import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { User } from "@/lib/api/redux/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";
import ActionCell from "./ActionCell";

interface UserColumnsProps {
  currentPage: number;
  itemsPerPage: number;
}

export function columns({ currentPage, itemsPerPage }: UserColumnsProps): ColumnDef<User>[] {
  return [
    {
      id: "stt-id",
      accessorKey: "id",
      header: "STT",
      cell: ({ row }) => {
        const index = row.index + 1 + (currentPage - 1) * itemsPerPage;
        const id = row.getValue("id") as string;
        return (
          <div className="flex flex-col">
            <span className="font-medium">{index}</span>
            <span className="text-xs text-muted-foreground break-all">{id}</span>
          </div>
        );
      },
    },
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
      cell: ({ row }) => <ActionCell userId={row.original.id} />,
    },
  ];
}
