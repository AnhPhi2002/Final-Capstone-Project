import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { toast } from "sonner";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "group_code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Group Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "semester_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Semester ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const group = row.original;
      let badge: ReactNode = <Badge>{group.status}</Badge>;
      if (group.status === "active") {
        badge = (
          <Badge className="bg-green-100 border border-green-500 text-green-500 hover:bg-green-200">
            Active
          </Badge>
        );
      } else if (group.status === "pending") {
        badge = (
          <Badge className="bg-yellow-100 border border-yellow-500 text-yellow-500 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      } else if (group.status === "inactive") {
        badge = (
          <Badge className="bg-red-100 border border-red-500 text-red-500 hover:bg-red-200">
            Inactive
          </Badge>
        );
      }
      return <div>{badge}</div>;
    },
  },
  {
    accessorKey: "max_members",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Max Members
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "is_multi_major",
    header: "Multi Major",
    cell: ({ row }) => (
      <div>{row.original.is_multi_major ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <div>{new Date(row.original.created_at).toLocaleString()}</div>,
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => <div>{new Date(row.original.updated_at).toLocaleString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(group.id.toString());
                toast("Copied Group ID.");
              }}
            >
              Copy Group ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/group-student/${group.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/group/${group.id}/edit`}>Edit Group</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Delete Group</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
