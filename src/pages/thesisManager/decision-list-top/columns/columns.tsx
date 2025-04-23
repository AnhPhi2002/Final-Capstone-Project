import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "stt",
    header: "STT",
    cell: ({ row }) => row.original.stt || row.index + 1,
    meta: { className: "text-center" },
  },
  {
    accessorKey: "mssv",
    header: "MSSV",
    meta: { className: "text-center" },
    cell: ({ row }) => row.original.mssv || "N/A",
  },
  {
    accessorKey: "studentName",
    header: "Họ và tên SV",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.studentName || "N/A",
  },
  {
    accessorKey: "groupCode",
    header: "Mã nhóm",
    meta: { className: "text-center" },
    cell: ({ row }) => row.original.groupCode || "N/A",
  },
  {
    accessorKey: "topicCode",
    header: "Mã đề tài",
    meta: { className: "text-center" },
    cell: ({ row }) => row.original.topicCode || "N/A",
  },
  {
    accessorKey: "topicNameEnglish",
    header: "Tên đề tài Tiếng Anh",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.topicNameEnglish || "N/A",
  },
  {
    accessorKey: "topicNameVietnamese",
    header: "Tên đề tài Tiếng Việt",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.topicNameVietnamese || "N/A",
  },
  {
    id: "gvhd",
    accessorKey: "mentor",
    header: "GVHD",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.mentor || "Chưa phân công",
  },
  {
    accessorKey: "major",
    header: "Ngành",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.major || "N/A",
  },
];

export default columns;