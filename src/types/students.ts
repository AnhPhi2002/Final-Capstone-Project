export type Student = {
  id: number;
  email: string;
  major_id: string;
  specialty_id: string;
  block3w_status: string;
  status: string;
};

export type SemesterStudent = {
  code: string;
  start_date: string; // ISO 8601 format: "YYYY-MM-DD"
  end_date: string; // ISO 8601 format: "YYYY-MM-DD"
  students: Student[];
};

export type AcademicYear = {
  id: number;
  year: string; // Example: "2025"
  semesters: SemesterStudent[];
};
