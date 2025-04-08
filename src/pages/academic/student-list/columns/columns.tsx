import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/lib/api/types";

export const getStudentColumns = (
  currentPage: number,
  itemsPerPage: number,
  searchText: string
): ColumnDef<Student>[] => {
  const highlight = (value: string) => {
    const keyword = searchText.trim().toLowerCase();
    const text = value.trim();
    const lower = text.toLowerCase();
    const index = lower.indexOf(keyword);
  

    if (index === -1) return value;

    return (
      <>
        {value.substring(0, index)}
        <mark className="bg-yellow-200 text-black font-bold">
          {value.substring(index, index + keyword.length)}
        </mark>
        {value.substring(index + keyword.length)}
      </>
    );
  };

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
      header: "Email",
      cell: ({ row }) => {
        const value = row.getValue("email") as string;
        return <span>{highlight(value)}</span>;
      },
    },
    {
      accessorKey: "studentCode",
      header: "Mã sinh viên",
      cell: ({ row }) => {
        const value = row.getValue("studentCode") as string;
        return <span>{highlight(value)}</span>;
      },
    },
  {
    accessorKey: "studentName",
    header: "Tên sinh viên",
    cell: ({ row }) => <span>{row.getValue("studentName")}</span>,
  },
  {
    accessorKey: "major",
    header: "Ngành học",
    cell: ({ row }) => {
      const value = row.getValue("major") as string;
      return <span>{highlight(value)}</span>;
    },
  },
  {
    accessorKey: "specialization",
    header: "Chuyên ngành",
    cell: ({ row }) => {
      const value = row.getValue("specialization") as string;
      return <span>{highlight(value)}</span>;
    },
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
};
