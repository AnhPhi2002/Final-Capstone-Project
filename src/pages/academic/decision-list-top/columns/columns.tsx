import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "STT",
    header: "STT",
    cell: ({ row }) => row.index + 1,
    meta: { className: "text-center" }, 
  },
  {
    accessorKey: "student.studentCode",
    header: "MSSV",
    meta: { className: "text-center" },
    cell: ({ row }) => row.original.student?.studentCode || "N/A",
  },
  
  {
    accessorKey: "student.user.username",
    header: "Họ và tên SV",
    meta: { className: "text-left" },
    cell: ({ row }) => {
      const user = row.original.student?.user;
      return user?.fullName || user?.username || "N/A";
    },
  }
,  
  {
    accessorKey: "groupCode",
    header: "Mã nhóm",
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
    accessorKey: "nameEn",
    header: "Tên đề tài Tiếng Anh",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.nameEn || "N/A",
  },
  {
    accessorKey: "nameVi",
    header: "Tên đề tài Tiếng Việt",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.nameVi || "N/A",
  },
  {
    id: "gvhd", // <- Thêm ID này!
    accessorKey: "creator.fullName",
    header: "GVHD",
    meta: { className: "text-left" },
    cell: ({ row }) => row.original.creator?.fullName || "Chưa phân công",
  },
  
  {
    accessorKey: "majors",
    header: "Ngành",
    meta: { className: "text-left" },
    cell: ({ row }) => (row.original.majors || []).map((major: any) => major.name).join(", ") || "N/A",
  },

];

export default columns;