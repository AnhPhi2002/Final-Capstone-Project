export type Lecturer = {
  id: string;
  lecturerCode: string;
  email: string;
  fullName: string;
  isActive: boolean;
};

export type SubmissionRound = {
  id: string;
  semesterId: string;
  roundNumber: number;
  description: string;
  startDate: string;
  endDate: string;
};

export type TableData = Lecturer; 
