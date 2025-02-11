// columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionMenu } from "./action";
import { Semester } from "@/types/semester";

export const columns: ColumnDef<Semester>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select this row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => <span>{row.getValue("year")}</span>,
  },
  {
    accessorKey: "code",
    header: "Kỳ học",
    cell: ({ row }) => <span>{row.getValue("code")}</span>,
  },
  {
    accessorKey: "start_date",
    header: "Ngày bắt đầu học kỳ  ",
    cell: ({ row }) =>
      new Date(row.getValue("start_date")).toLocaleDateString(),
  },
  {
    accessorKey: "end_date",
    header: "Ngày kết thúc học kỳ ",
    cell: ({ row }) => new Date(row.getValue("end_date")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "Active"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo học kỳ ",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu semesterId={row.original.id} />,
  },
];
