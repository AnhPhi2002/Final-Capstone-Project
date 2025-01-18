
  export type Semester = {
    id: string;
    code: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    status: "Active" | "Inactive";
    created_at: string;
    year: string;
  };
