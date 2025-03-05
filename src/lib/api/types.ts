// types.ts
export interface Semester {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  yearId: string;
  year: {
    id: string;
    year: number;
    createdAt: string;
    updatedAt: string;
  };
  semester_detail?: any[]; // Nếu không có `semester_detail`, hãy để kiểu là tùy chọn (`?`)
}

export interface Student {
  id: string;             
  email: string;           
  major: string;          
  specialization: string; 
  status: string;         
}

export interface Mentor {
  id: string;             
  email: string;           
  username: string;          
  lecturerCode: string; 
  fullName: string;     
  isActive: boolean;
  role: string;    
}

// export type StudentNotGroup = {
//   id: string;
//   studentCode: string;
//   majorId: string;
//   specializationId: string;
//   isEligible: boolean;
//   personalEmail?: string | null;
//   status: string;
//   user: {
//     id: string;
//     username: string;
//     email: string;
//   };
//   major: {
//     id: string;
//     name: string;
//   };
//   specialization: {
//     id: string;
//     name: string;
//   };
// };

export interface SubmissionRound {
  id: string;
  semesterId: string;
  roundNumber: number;
  startDate: string;
  endDate: string;
  description: string;
  status: "PENDING" | "ACTIVE" | "COMPLETE";
}

  