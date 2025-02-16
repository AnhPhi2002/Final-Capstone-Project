import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

import { Action } from "./action";


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "group_code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Mã Nhóm
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "topic_code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Mã Đề Tài
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "mentor_1_id",
    header: "Giảng Viên 1",
    cell: ({ row }) => <div>{row.original.mentor_1_id || "N/A"}</div>,
  },
  {
    accessorKey: "mentor_2_id",
    header: "Giảng Viên 2",
    cell: ({ row }) => <div>{row.original.mentor_2_id || "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Trạng Thái
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const group = row.original;
      let badge: ReactNode = <Badge>{group.status}</Badge>;
      if (group.status === "active") {
        badge = (
          <Badge className="bg-green-100 border border-green-500 text-green-500 hover:bg-green-200">
            Đang Hoạt Động
          </Badge>
        );
      } else if (group.status === "pending") {
        badge = (
          <Badge className="bg-yellow-100 border border-yellow-500 text-yellow-500 hover:bg-yellow-200">
            Chờ Xử Lý
          </Badge>
        );
      } else if (group.status === "inactive") {
        badge = (
          <Badge className="bg-red-100 border border-red-500 text-red-500 hover:bg-red-200">
            Ngừng Hoạt Động
          </Badge>
        );
      }
      return <div>{badge}</div>;
    },
  },
  {
    accessorKey: "max_members",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Thành Viên
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "is_multi_major",
    header: "Liên Ngành",
    cell: ({ row }) => {
      const isMultiMajor = row.original.is_multi_major;
      return (
        <Badge
          className={`${
            isMultiMajor
              ? "bg-green-100 border border-green-500 text-green-500"
              : "bg-red-100 border border-red-500 text-red-500"
          }`}
        >
          {isMultiMajor ? "Có" : "Không"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày Tạo",
    cell: ({ row }) => <div>{new Date(row.original.created_at).toLocaleString()}</div>,
  },
  {
    accessorKey: "updated_at",
    header: "Ngày Cập Nhật",
    cell: ({ row }) => <div>{new Date(row.original.updated_at).toLocaleString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return <Action group={group} />;
    },
  }
];


