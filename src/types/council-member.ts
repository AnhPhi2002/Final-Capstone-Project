export type CouncilMember = {
  id: number;
  email: string;
  phoneNumber: string;
  lecturerCode: string;
  role: string;
  status: string;
  createdAt: string; // ISO format (YYYY-MM-DDTHH:mm:ssZ)
  updatedAt: string; // ISO format (YYYY-MM-DDTHH:mm:ssZ)
};

export type SemesterCouncil = {
  id: string;
  year: string;
  code: string;
  start_date: string;
  end_date: string;
  councilMember: CouncilMember[];
};

export type AcademicYearCouncil = SemesterCouncil[];
