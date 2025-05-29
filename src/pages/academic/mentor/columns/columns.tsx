import { ColumnDef } from "@tanstack/react-table";
import { Mentor } from "@/lib/api/types";
import { Badge } from "@/components/ui/badge";

/**
 * Highlight phần khớp với searchTerm.
 */
const highlightMatch = (text: string, query: string) => {
  const cleanQuery = query.trim();
  if (!cleanQuery || !text) return text;
  const parts = text.split(new RegExp(`(${cleanQuery})`, "gi"));
  return parts.map((part, idx) =>
    part.toLowerCase() === cleanQuery.toLowerCase() ? (
      <span key={idx} className="bg-yellow-200 font-bold">{part}</span>
    ) : (
      part
    )
  );
};

/**
 * Trả về cột hiển thị mentor có STT và highlight tìm kiếm.
 */
export const getColumns = (
  offset: number,
  searchTerm: string
): ColumnDef<Mentor>[] => [
  {
    header: "STT",
    cell: ({ row }) => <span className="font-bold">{offset + row.index + 1}</span>,
  },
  {
    accessorKey: "lecturerCode",
    header: "Mã GV",
    cell: ({ row }) =>
      highlightMatch(row.original.lecturerCode || "", searchTerm),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) =>
      highlightMatch(row.original.email || "", searchTerm),
  },
  {
    accessorKey: "username",
    header: "Tên giảng viên",
    cell: ({ row }) =>
      highlightMatch(row.original.username || "", searchTerm),
  },
  {
    accessorKey: "department",
    header: "Bộ phận",
    cell: ({ row }) =>
      highlightMatch(row.original.department || "", searchTerm),
  },
  {
    accessorKey: "departmentPosition",
    header: "Chuyên môn",
    cell: ({ row }) =>
      highlightMatch(row.original.departmentPosition || "", searchTerm),
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
];
