import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/lib/api/types";

export const columns: ColumnDef<Student>[] = [
  // {
  //   id: "id",
  //   header: "STT",
  //   cell: ({ row }) => row.index + 1,
  // },  
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "studentCode",
    header: "Mã sinh viên",
    cell: ({ row }) => <span>{row.getValue("studentCode")}</span>,
  },
  {
    accessorKey: "studentName",
    header: "Tên sinh viên",
    cell: ({ row }) => <span>{row.getValue("studentName")}</span>,
  },
  {
    accessorKey: "major",
    header: "Ngành học",
    cell: ({ row }) => <span>{row.getValue("major")}</span>,
  },
  {
    accessorKey: "specialization",
    header: "Chuyên ngành",
    cell: ({ row }) => <span>{row.getValue("specialization")}</span>,
  },
  {
    accessorKey: "block3",
    header: "Block",
    cell: ({ row }) => {
      const block = row.getValue("block3") as boolean | null;
  
      if (block === null || block === undefined) {
        return (
          <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-700">
            Đang xử lý
          </Badge>
        );
      }
  
      return (
        <Badge
          className={
            block
              ? "bg-navy-800 text-navy-500 hover:bg-navy-200 hover:text-navy-600"
              : "bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600"
          }
        >
          {block ? "Block 3" : "Block 10"}
        </Badge>
      );
    },
  }
  
  ,
  {
    accessorKey: "qualificationStatus",
    header: "Điều kiện",
    cell: ({ row }) => {
      const raw = row.getValue("qualificationStatus") as string | undefined;
      const status = raw?.trim().toLowerCase();

      if (!status || status === "processing") {
        return (
          <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-700">
            Đang xử lý
          </Badge>
        );
      }

      const isQualified = status === "qualified";

      return (
        <Badge
          className={
            isQualified
              ? "bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600"
              : "bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600"
          }
        >
          {isQualified ? "Đủ điều kiện" : "Không đủ điều kiện"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const rawStatus = row.getValue("status") as string;
      const status = rawStatus?.trim().toUpperCase();
  
      switch (status) {
        case "ACTIVE":
          return (
            <Badge className="bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600">
              Hoạt động
            </Badge>
          );
        case "PENDING":
        default:
          return (
            <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-700">
              Đang xử lý
            </Badge>
          );
      }
    },
  },
  
];
