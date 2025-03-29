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
  semester_detail?: any[]; 
}

// types.ts
export interface Student {
  id: string;
  email: string;
  studentCode: string;
  studentName: string;
  major: string;
  specialization: string;
  qualificationStatus: "qualified" | "not qualified" | "processing";
  status: "ACTIVE" | "PENDING" ;
  isEligible: boolean;
  semester: string;
}

// src/types/mentor.ts
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
  isDeleted?: boolean;
}

export interface Council {
  id: string;
  code: string;
  name: string;
  round: number;
  type: string;
  status: string;
  createdDate: string;
  semesterId: string;
  submissionPeriodId: string;
  councilStartDate: string,
  councilEndDate: string,
  isDeleted?: boolean;
  members: CouncilMember[];
}



export interface CouncilReview {
  id: string;
  code: string;
  name: string;
  round: number;
  type: string;
  status: "ACTIVE" | "UPCOMING" | "COMPLETE" | string;
  createdDate: string;
  semesterId: string;
  submissionPeriodId: string;
  councilStartDate: string,
  councilEndDate: string,
  startDate: string,
  endDate: string,
  isDeleted?: boolean;
  members: CouncilReviewMember[];
  sessions: CouncilReviewSessions[];
}

export interface CouncilReviewMember {
  id: string;
  councilId: string;
  roleId: string;
  status: string;
  userId: string;
  roleName: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  }

  isDeleted?: boolean;
}

export interface CouncilReviewSessions {
  reviewTime: string;
  room?: string;
  group?: {
    id: string;
    groupCode:string;
  }
  topic?: {
    topicCode: string;
    name: string;
  }
  isDeleted?: boolean;
  assignments?: CouncilReviewAssignment[] ;
}

export interface CouncilReviewAssignment {
  id: string;
  score?: number;
  feedback?: string;
  topicId?: string;
  status: string;
  isDeleted?: boolean;
  reviewer?: {
    id: string;
    fullName: string;
    // email: string;
  };
}



export interface SubmissionRound {
  id: string;
  type: "TOPIC" | "CHECK-TOPIC" | "REVIEW" | "DEFENSE";
  semesterId: string;
  roundNumber: number;
  startDate: string;
  endDate: string;
  description: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETE";
  isDeleted: boolean;
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

export interface Group {
  id: string;
  groupCode: string;
  semesterId: string;
  status: string;
  isAutoCreated: boolean;
  createdBy: string;
  maxMembers: number;
  isMultiMajor: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  topicEnglish: string | null;
  topicTiengViet: string | null;
  totalMembers: number;
  members: {
    id: string;
    groupId: string;
    studentId: string;
    role: string;
    joinedAt: string;
    leaveAt: string | null;
    leaveReason: string | null;
    isActive: boolean;
    status: string;
    student: {
      id: string;
      userId: string;
      studentCode: string;
      majorId: string;
      specializationId: string;
      isEligible: boolean;
      personalEmail: string | null;
      status: string;
      user: {
        id: string;
        username: string;
        email: string;
        fullName: string | null;
        profession: string;
        specialty: string;
      };
    };
  }[];
  mentors: {
    id: string;
    username: string;
    email: string;
    role: string;
  }[];
}

export interface Mentor {
  id: string;
  fullName: string;
  email: string;
  // role?: string; 
}

export interface GroupResponse {
  group: Group;
  semester: {
    code: string;
    startDate: string;
    endDate: string;
  };
  members: {
    studentId: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
  }[];
  creator: {
    id: string;
    fullName: string;
    email: string;
  };
  mentors?: Mentor[];
  topicAssignments: any[]; 
}

export interface ReviewSchedule {
  schedule: {
    id: string;
    councilId: string;
    groupId: string;
    topicId: string;
    reviewTime: string;
    room: string;
    reviewRound: number;
    status: string;
    council: {
      code: string;
      name: string;
    };
    group: {
      groupCode: string;
    };
    topic: {
      topicCode: string;
      // nameEn: string;
    };
  };
  assignments:  ReviewScheduleAssignment[];
  url: string | null;
}

export interface ReviewScheduleAssignment {
  id: string;
  score: number | null;
  feedback: string | null;
  status: string;
  reviewRound: number;
  reviewer: {
    fullName?: string;
    email?: string;
  }
}

export interface GroupApiResponse {
  message: string;
  data: GroupWithDetails[];
}

export interface GroupWithDetails {
  group: Group;
  semester: {
    code: string;
    startDate: string;
    endDate: string;
  };
  members: Member[];
  creator: {
    id: string;
    fullName: string;
    email: string;
  };
  mentors: Mentor[];
  topicAssignments: TopicAssignment[];
}

export interface Group {
  id: string;
  groupCode: string;
  semesterId: string;
  status: string;
  isAutoCreated: boolean;
  createdBy: string;
  maxMembers: number;
  isMultiMajor: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Mentor {
  mentorId: string;
  username: string;
  email: string;
  role: string;
}

export interface Member {
  studentId: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
}

export interface TopicAssignment {
  topicId: string;
  topicName: string;
  status: string;
}