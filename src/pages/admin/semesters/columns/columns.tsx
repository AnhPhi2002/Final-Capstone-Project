import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Semester } from "@/lib/api/types";
import { ActionMenu } from "./action";

export const columns: ColumnDef<Semester>[] = [
  {
    accessorKey: "year.year",
    header: "Year",
    cell: ({ row }) => (
      <span>{row.original.year?.year || "Unknown Year"}</span>
    ),
  },
  {
    accessorKey: "code",
    header: "Semester Code",
    cell: ({ row }) => <span>{row.getValue("code")}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString(),
  },
  {
    accessorKey: "registrationDeadline",
    header: "Registration Deadline",
    cell: ({ row }) => new Date(row.getValue("registrationDeadline")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "ACTIVE"
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
    {
    id: "actions",
    cell: ({ row }) => <ActionMenu semesterId={row.original.id} />,
  },
];
//   {
//     id: "actions",
//     cell: ({ row }) => <ActionMenu semesterId={row.original.id} />,
//   },

