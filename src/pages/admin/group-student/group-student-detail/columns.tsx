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
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { GroupMember } from "@/types/group-student";

export const columns: ColumnDef<GroupMember>[] = [
  {
    accessorKey: "group_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Group ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "student_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Student ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    accessorKey: "joined_at",
    header: "Joined At",
    cell: ({ row }) => <div>{new Date(row.original.joined_at).toLocaleString()}</div>,
  },
  {
    accessorKey: "leave_at",
    header: "Leave At",
    cell: ({ row }) => (
      <div>
        {row.original.leave_at ? new Date(row.original.leave_at).toLocaleString() : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "leave_reason",
    header: "Leave Reason",
    cell: ({ row }) => <div>{row.original.leave_reason || "N/A"}</div>,
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (
      <div>{row.original.is_active ? "Yes" : "No"}</div>
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
      const member = row.original;
      let badge: ReactNode = <Badge>{member.status}</Badge>;
      if (member.status === "active") {
        badge = (
          <Badge className="bg-green-100 border border-green-500 text-green-500 hover:bg-green-200">
            Active
          </Badge>
        );
      } else if (member.status === "inactive") {
        badge = (
          <Badge className="bg-red-100 border border-red-500 text-red-500 hover:bg-red-200">
            Inactive
          </Badge>
        );
      } else if (member.status === "left") {
        badge = (
          <Badge className="bg-yellow-100 border border-yellow-500 text-yellow-500 hover:bg-yellow-200">
            Left
          </Badge>
        );
      }
      return <div>{badge}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

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
                navigator.clipboard.writeText(member.id.toString());
                
              }}
            >
              Copy Member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Edit Member</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Remove Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
