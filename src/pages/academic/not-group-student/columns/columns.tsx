import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { StudentNotGroup } from "@/lib/api/redux/types/not-group-student";

/**
 * Highlight phần khớp với searchTerm bằng nền vàng + in đậm.
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
 * Tạo danh sách cột với STT và highlight kết quả tìm kiếm.
 */
export const getColumns = (
  baseIndex: number,
  searchTerm: string
): ColumnDef<StudentNotGroup, unknown>[] => [
  {
    header: "STT",
    cell: ({ row }) => (
      <span className="font-bold">{baseIndex + row.index + 1}</span>
    ),
  },
  {
    accessorKey: "studentCode",
    header: "MSSV",
    cell: ({ row }) =>
      highlightMatch(row.original.studentCode || "", searchTerm),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) =>
      highlightMatch(row.original.email || "", searchTerm),
  },
  {
    accessorKey: "major",
    header: "Ngành học",
    cell: ({ row }) =>
      highlightMatch(row.original.major || "", searchTerm),
  },
  {
    accessorKey: "specialization.name",
    header: "Chuyên ngành hẹp",
    cell: ({ row }) =>
      highlightMatch(row.original.specialization || "", searchTerm),
  },
  {
    accessorKey: "qualificationStatus",
    header: "Điều kiện",
    cell: ({ row }) => {
      const status = row.getValue("qualificationStatus") as string;
      let badgeClass = "bg-gray-100 text-gray-500";
      let statusText = "Chưa xác định";

      if (status === "qualified") {
        badgeClass = "bg-green-100 text-green-500";
        statusText = "Đủ điều kiện";
      } else if (status === "not qualified") {
        badgeClass = "bg-red-100 text-red-500";
        statusText = "Không đủ điều kiện";
      }

      return <Badge className={badgeClass}>{statusText}</Badge>;
    },
  },
];
