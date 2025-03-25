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
    accessorKey: "mentors",
    header: "Giảng Viên 1",
    cell: ({ row }) => {
      const mentors = row.original.mentors || [];
      // Tìm mentor chính (mentor_main)
      const mainMentor = mentors.find((m: any) => m.role.name === "mentor_main");
      return <div>{mainMentor ? mainMentor.mentor.email : "N/A"}</div>;
    },
  },
  {
    accessorKey: "mentors",
    header: "Giảng Viên 2",
    cell: ({ row }) => {
      const mentors = row.original.mentors || [];
      // Tìm mentor phụ (mentor_sub)
      const subMentor = mentors.find((m: any) => m.role.name === "mentor_sub");
      return <div>{subMentor ? subMentor.mentor.email : "N/A"}</div>;
    },
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
    accessorKey: "members",
    header: "Số Thành Viên Hiện Tại",
    cell: ({ row }) => {
      const members = row.original.members || [];
      return <div>{members.length}</div>;
    },
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
