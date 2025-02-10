// types/semester-detail.ts

export type SemesterDetail = {
  id: string;
  semester_year: string;
  semester_code: string;
  start_date: string;
  end_date: string;
  status: "Active" | "Inactive";
  created_at: string;
};
