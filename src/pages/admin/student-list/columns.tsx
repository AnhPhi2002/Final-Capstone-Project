import { ColumnDef } from "@tanstack/react-table"; // Ensure this package is installed for table definition
import { format } from "date-fns"; // Used for date formatting if needed

export type Student = {
  id: number;
  user_id: number;
  student_code: string;
  major_id: number;
  specialty_id: number;
  credits_completed: number;
  is_eligible: boolean;
  block3w_status: string;
  semester_id: number;
  status: string; // Adjust enum type as needed
  import_at: string; // Use Date type if preferred
  import_source: string;
  is_imported: boolean;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "student_code",
    header: "Student Code",
  },
  {
    accessorKey: "major_id",
    header: "Major ID",
  },
  {
    accessorKey: "specialty_id",
    header: "Specialty ID",
  },
  {
    accessorKey: "credits_completed",
    header: "Credits Completed",
  },
  {
    accessorKey: "is_eligible",
    header: "Eligible",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "block3w_status",
    header: "Block 3W Status",
  },
  {
    accessorKey: "semester_id",
    header: "Semester ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "import_at",
    header: "Import Date",
    cell: ({ getValue }) => format(new Date(getValue() as string), "yyyy-MM-dd HH:mm"),
  },
  {
    accessorKey: "import_source",
    header: "Import Source",
  },
  {
    accessorKey: "is_imported",
    header: "Imported",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
];
