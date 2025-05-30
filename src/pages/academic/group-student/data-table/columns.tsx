import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Action } from "./action";

/**
 * Highlight phần khớp với query bằng màu vàng + đậm.
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

export const getColumns = (
  offset: number,
  searchTerm: string
): ColumnDef<any>[] => [
  {
    header: "STT",
    cell: ({ row }) => <span className="font-bold">{offset + row.index + 1}</span>,
  },
  {
    accessorKey: "groupCode",
    header: "Mã Nhóm",
    cell: ({ row }) =>
      highlightMatch(row.original.groupCode || "", searchTerm),
  },
  {
    accessorKey: "mentors",
    header: "Giảng Viên 1",
    cell: ({ row }) => {
      const mentors = row.original.mentors || [];
      const mainMentor = mentors.find((m: any) => m.role.name === "mentor_main");
      const email = mainMentor?.mentor?.email || "N/A";
      return highlightMatch(email, searchTerm);
    },
  },
  {
    accessorKey: "mentors",
    header: "Giảng Viên 2",
    cell: ({ row }) => {
      const mentors = row.original.mentors || [];
      const subMentor = mentors.find((m: any) => m.role.name === "mentor_sub");
      const email = subMentor?.mentor?.email || "N/A";
      return highlightMatch(email, searchTerm);
    },
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const status = row.original.status;
      let text = "Không xác định";
      let badgeClass = "bg-gray-100 text-gray-500";

      if (status === "ACTIVE") {
        text = "Đang Hoạt Động";
        badgeClass = "bg-green-100 text-green-500";
      } else if (status === "PENDING") {
        text = "Chờ Xử Lý";
        badgeClass = "bg-yellow-100 text-yellow-500";
      } else if (status === "INACTIVE") {
        text = "Ngừng Hoạt Động";
        badgeClass = "bg-red-100 text-red-500";
      }

      return <Badge className={badgeClass}>{highlightMatch(text, searchTerm)}</Badge>;
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
      const isMulti = row.original.isMultiMajor;
      const text = isMulti ? "Có" : "Không";
      const cls = isMulti ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500";
      return <Badge className={cls}>{highlightMatch(text, searchTerm)}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
    cell: ({ row }) =>
      <div>{new Date(row.original.createdAt).toLocaleString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return <Action group={group} />;
    },
  },
];
