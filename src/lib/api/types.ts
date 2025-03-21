// types.ts
export interface Semester {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  yearId: string;
  isDeleted?: boolean;
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

// src/types/mentor.ts
export interface Mentor {
  id: string;
  email: string;
  username: string;
  lecturerCode: string;
  fullName: string;
  isActive: boolean;
  role: string;
  department?: string; 
  departmentPosition?: string; 
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

export type Topic = {
  id: string;
  topicCode: string;
  nameVi: string;
  nameEn: string;
  description: string;
  status: string;
  createdAt?: string; 
  topicAssignments?: any[];// Có thể cần nếu API trả về

  semester: {
    id: string;
    code: string;
    startDate: string;
    endDate: string;
  };

  createdBy: {
    fullName: string;
    email: string;
  };

  subSupervisor?: string | null;

  majors: {
    id: string;
    name: string;
  }[];

  group?: {
    id: string;
    groupCode: string;
    semester: {
      id: string;
      code: string;
    };
    members: {
      id: string;
      studentId: string;
      userId?: string | null;
      roleId: string;
      joinedAt: string;
      leaveAt?: string | null;
      leaveReason?: string | null;
      isActive: boolean;
      status: string;
      user?: {
        id: string;
        fullName?: string | null;
        email?: string | null;
      } | null;
      role: {
        name: "leader" | "member"; // Định nghĩa rõ leader & member
      };
    }[];
  };
};

