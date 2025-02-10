
  import { SemesterDetail } from "./semester-detail";

  export type Semester = {
    id: string;
    year: string;
    code: string;
    semester_detail: SemesterDetail[];
  };
