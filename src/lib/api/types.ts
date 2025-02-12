// types.ts
export interface Semester {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
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


  