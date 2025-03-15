import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ArrowUpDown } from "lucide-react";
import { Action } from "./action";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "groupCode",
    header: "Mã Nhóm",
  },
  {
    accessorKey: "mentor1Id",
    header: "Giảng Viên 1",
    cell: ({ row }) => <div>{row.original.mentor1Id || "N/A"}</div>,
  },
  {
    accessorKey: "mentor2Id",
    header: "Giảng Viên 2",
    cell: ({ row }) => <div>{row.original.mentor2Id || "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const status = row.original.status;
      let badge;

      if (status === "ACTIVE") {
        badge = <Badge className="bg-green-100 text-green-500">Đang Hoạt Động</Badge>;
      } else if (status === "PENDING") {
        badge = <Badge className="bg-yellow-100 text-yellow-500">Chờ Xử Lý</Badge>;
      } else {
        badge = <Badge className="bg-red-100 text-red-500">Ngừng Hoạt Động</Badge>;
      }

      return <div>{badge}</div>;
    },
  },
  {
    accessorKey: "maxMembers",
    header: "Số Thành Viên Tối Đa",
  },
  {
    accessorKey: "isMultiMajor",
    header: "Liên Ngành",
    cell: ({ row }) => {
      return (
        <Badge className={row.original.isMultiMajor ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}>
          {row.original.isMultiMajor ? "Có" : "Không"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
    cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return <Action group={group} />;
    },
  },
];
