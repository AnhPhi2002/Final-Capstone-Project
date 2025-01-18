import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ActionMenu } from "./action";
import { ArrowUpDown } from "lucide-react";

export type Group = {
  id: string;
  group_name: string;
  student_leader: string;
  mentor_1: string;
  mentor_2: string;
  review_1: "Done" | "Failed" | "Default";
  review_1_file: string | null;
  review_2: "Done" | "Failed" | "Default";
  review_2_file: string | null;
  review_3: "Done" | "Failed" | "Default";
  review_3_file: string | null;
  bv_1: "Passed" | "Not Passed" | "Default";
  bv_2: "Passed" | "Not Passed" | "Default";
};

export const columns: ColumnDef<Group>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "group_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Group Name
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span>{row.getValue("group_name")}</span>,
  },
  {
    accessorKey: "student_leader",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Student Leader
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span>{row.getValue("student_leader")}</span>,
  },
  {
    accessorKey: "mentor_1",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Mentor 1
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span>{row.getValue("mentor_1")}</span>,
  },
  {
    accessorKey: "mentor_2",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 m-0 w-full justify-start"
      >
        Mentor 2
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span>{row.getValue("mentor_2")}</span>,
  },
  {
    accessorKey: "review_1",
    header: "Review 1",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.getValue("review_1") as string;

      return (
        <Badge
          className={`${
            status === "Done"
              ? "bg-green-100 text-green-500 border-green-500"
              : status === "Failed"
              ? "bg-red-100 text-red-500 border-red-500"
              : "bg-gray-100 text-gray-500 border-gray-500"
          }`}
        >
          {status === "Default" ? "Default  " : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "review_1_file",
    header: "R1 File",
    cell: ({ row }) => {
      const fileUrl = row.getValue("review_1_file") as string | null;
  
      return fileUrl ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          <Badge className="bg-blue-100 text-blue-500 border border-blue-500 hover:bg-blue-200 cursor-pointer">
            View
          </Badge>
        </a>
      ) : (
        <Badge className="bg-gray-100 text-gray-400 border border-gray-300">
          No File
        </Badge>
      );
    },
  },
  {
    accessorKey: "review_2",
    header: "Review 2",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.getValue("review_2") as string;

      return (
        <Badge
          className={`${
            status === "Done"
              ? "bg-green-100 text-green-500 border-green-500"
              : status === "Failed"
              ? "bg-red-100 text-red-500 border-red-500"
              : "bg-gray-100 text-gray-500 border-gray-500"
          }`}
        >
          {status === "Default" ? "Default" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "review_2_file",
    header: "R2 File",
    cell: ({ row }) => {
      const fileUrl = row.getValue("review_1_file") as string | null;
  
      return fileUrl ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          <Badge className="bg-blue-100 text-blue-500 border border-blue-500 hover:bg-blue-200 cursor-pointer">
            View
          </Badge>
        </a>
      ) : (
        <Badge className="bg-gray-100 text-gray-400 border border-gray-300">
          No File
        </Badge>
      );
    },
  },
  {
    accessorKey: "review_3",
    header: "Review 3",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.getValue("review_3") as string;

      return (
        <Badge
          className={`${
            status === "Done"
              ? "bg-green-100 text-green-500 border-green-500"
              : status === "Failed"
              ? "bg-red-100 text-red-500 border-red-500"
              : "bg-gray-100 text-gray-500 border-gray-500"
          }`}
        >
          {status === "Default" ? "Default" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "review_3_file",
    header: "R3 File",
    cell: ({ row }) => {
      const fileUrl = row.getValue("review_1_file") as string | null;
  
      return fileUrl ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          <Badge className="bg-blue-100 text-blue-500 border border-blue-500 hover:bg-blue-200 cursor-pointer">
            View
          </Badge>
        </a>
      ) : (
        <Badge className="bg-gray-100 text-gray-400 border border-gray-300">
          No File
        </Badge>
      );
    },
  },
  {
    accessorKey: "bv_1",
    header: "B.v lần 1",
    enableSorting: false,
    cell: ({ row }) => {
      const value = row.getValue("bv_1") as string;

      return (
        <Badge
          className={`${
            value === "Passed"
              ? "bg-green-100 text-green-500 border-green-500"
              : value === "Not Passed"
              ? "bg-red-100 text-red-500 border-red-500"
              : "bg-gray-100 text-gray-500 border-gray-500"
          }`}
        >
          {value === "Default" ? "Default" : value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "bv_2",
    header: "B.v lần 2",
    enableSorting: false,
    cell: ({ row }) => {
      const value = row.getValue("bv_2") as string;

      return (
        <Badge
          className={`${
            value === "Passed"
              ? "bg-green-100 text-green-500 border-green-500"
              : value === "Not Passed"
              ? "bg-red-100 text-red-500 border-red-500"
              : "bg-gray-100 text-gray-500 border-gray-500"
          }`}
        >
          {value === "Default" ? "Default" : value}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return <ActionMenu groupId={group.id} />;
    },
  },
];
