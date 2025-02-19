export type Mentor = {
  FullName: string;
  Email: string;
};

export type Semester = {
  code: string;
  start_date: string;
  end_date: string;
  mentors: Mentor[];
};

export type AcademicYear = {
  id: number;
  year: string;
  semesters: Semester[];
};

export type UniversityData = AcademicYear[];
