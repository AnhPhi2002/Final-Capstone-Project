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
export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface CouncilMember {
  id: string;
  councilId: string;
  roleId: string;
  status: string;
  userId: string;
  user: User;
}

export interface Council {
  id: string;
  name: string;
  round: number;
  status: string;
  createdDate: string;
  semesterId: string;
  submissionPeriodId: string;
  councilStartDate: string,
  councilEndDate: string,
  members: CouncilMember[];
}


export interface SubmissionRound {
  id: string;
  semesterId: string;
  roundNumber: number;
  startDate: string;
  endDate: string;
  description: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETE";
}

export type ApproveTopic = {
  registrationId: string;
  topicId: string; // ✅ Thêm topicId
  semesterId: string; // ✅ Thêm semesterId
  topicCode: string;
  nameEn: string;
  description: string;
  registrationStatus: "PENDING" | "APPROVED" | "REJECTED";
  registeredAt: string;
  userId: string;
  userFullName: string | null;
  userEmail: string;
  groupId: string | null;
  groupCode: string | null;
  leaderRole: string;
};


