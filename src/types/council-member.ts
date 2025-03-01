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
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  bv_1: string; // Bảo vệ lần 1
  bv_2: string; // Bảo vệ lần 2
  start_date_bv1: string; // YYYY-MM-DD
  start_time_bv1: string; // HH:mm
  end_time_bv1: string; // HH:mm
  start_date_bv2: string; // YYYY-MM-DD
  start_time_bv2: string; // HH:mm
  end_time_bv2: string; // HH:mm
  councilMember: CouncilMember[];
};

export type AcademicYearCouncil = SemesterCouncil[];
