export interface User {
  id: string;
  fullName: string | null;
  email: string;
}

export interface TopicRegistration {
  id: string;
  status: string;
  registeredAt: string;
  userId: string;
  topicId: string;
  user: User;
  group: { id: string; groupCode: string } | null;
}

export interface TopicAssignment {
  id?: string;
  groupId: string;
  status: string;
  approvalStatus: string;
  group?: {
    id: string;
    groupCode: string;
  };
}

export interface GroupInfo {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  nameVi: string;
  nameEn: string;
  name: string;
  topicCode?: string;
  groupCode?: string;
  description: string;
  isBusiness: boolean;
  businessPartner: string | null;
  source: string | null;
  semesterId: string | undefined;
  majors: GroupInfo[];
  mainMentorId?: string | null;
  subMentorId?: string | null;
  subSupervisor?: string | null;
  mainSupervisor?: string | null;
  submissionPeriodId: string | null;
  createdBy: string | null;
  status: string;
  reasons: string;
  reviewReason?: string | null;
  subSupervisorEmail: string | null;
  creator?: {
    fullName: string;
    email: string;
    createdAt?: string;
  };
  draftFileUrl: string | null | undefined;
  group?: {
    id: string;
    groupCode: string;
  };
  createdAt: string;
  topicRegistrations: TopicRegistration[];
  subMentor?: {
    fullName: string;
    email: string;
  };
  documents?: {
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
  topicAssignments?: TopicAssignment[];
}

// Type cho ApproveTopic nếu cần
export interface ApproveTopic {
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
}