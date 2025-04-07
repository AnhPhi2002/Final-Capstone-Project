// lib/api/defenseSchedule.ts

// Type chính cho CouncilDefense
export interface CouncilDefense {
  id: string;
  code: string;
  name: string;
  round: number;
  type: string;
  status: "ACTIVE" | "UPCOMING" | "COMPLETE" | string;
  createdDate: string;
  semesterId: string;
  submissionPeriodId: string;
  councilStartDate: string;
  councilEndDate: string;
  startDate: string;
  endDate: string;
  isDeleted?: boolean;
  members: CouncilDefenseMember[];
  sessions: CouncilDefenseSessions[]; // Giữ nguyên nếu cần
  defenseSchedules: DefenseSchedule[]; // Thêm trường này để khớp với API
}

// Thành viên của hội đồng bảo vệ
export interface CouncilDefenseMember {
  id: string;
  councilId: string;
  roleId: string;
  status: string;
  userId: string;
  role: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  isDeleted?: boolean;
}

// Phiên bảo vệ của hội đồng (giữ nguyên nếu cần)
export interface CouncilDefenseSessions {
  reviewTime: string;
  room?: string;
  group?: {
    id: string;
    groupCode: string;
  };
  topic?: {
    topicCode: string;
    name: string;
  };
  isDeleted?: boolean;
  assignments?: CouncilDefenseAssignment[];
}

// Phân công chấm điểm trong phiên bảo vệ
export interface CouncilDefenseAssignment {
  id: string;
  score?: number;
  feedback?: string;
  topicId?: string;
  status: string;
  isDeleted?: boolean;
  reviewer?: {
    id: string;
    fullName: string;
  };
}

// Type chính cho DefenseSchedule
export interface DefenseSchedule {
  id: string;
  councilId: string;
  groupId: string;
  defenseTime: string;
  room: string;
  defenseRound: number;
  status: string;
  notes: string | null;
  result: string | null;
  feedback: string | null;
  createdAt: string;
  isDeleted: boolean;
  council: {
    id: string;
    code: string;
    name: string;
    topicAssId: string | null;
    createdDate: string;
    status: string;
    type: string;
    round: number;
    semesterId: string;
    isActive: boolean;
    councilStartDate: string;
    councilEndDate: string;
    submissionPeriodId: string;
    isDeleted: boolean;
    members: CouncilDefenseMember[];
  };
  group: {
    id: string;
    groupCode: string;
    semesterId: string;
    status: string;
    isAutoCreated: boolean;
    createdBy: string;
    maxMembers: number;
    isMultiMajor: boolean;
    createdAt: string;
    updatedAt: string;
    isLocked: boolean;
    isDeleted: boolean;
    members: GroupMember[];
    mentors: GroupMentor[];
    topicAssignments: TopicAssignment[];
  };
  memberResults: MemberResult[];
  documents: DefenseScheduleDocument[];
}

// Thành viên nhóm
export interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  userId: string | null;
  roleId: string;
  joinedAt: string;
  leaveAt: string | null;
  leaveReason: string | null;
  isActive: boolean;
  status: string;
  isDeleted: boolean;
  student: {
    id: string;
    studentCode: string;
    user: {
      fullName: string | null;
      email: string;
    };
  };
  role: {
    id: string;
    name: string;
  };
}

// Mentor của nhóm
export interface GroupMentor {
  id: string;
  groupId: string;
  mentorId: string;
  roleId: string;
  addedBy: string;
  addedAt: string;
  defenseRoundDecision: string | null;
  isDeleted: boolean;
  mentor: {
    id: string;
    fullName: string;
    email: string;
  };
  role: {
    id: string;
    name: string;
  };
}

// Phân công đề tài
export interface TopicAssignment {
  id: string;
  topicId: string;
  groupId: string;
  status: string;
  approvalStatus: string;
  defendStatus: string;
  defenseRound: string;
  assignedBy: string;
  assignedAt: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  topic: {
    id: string;
    topicCode: string;
    name: string;
    status: string;
  };
}

// Kết quả của từng thành viên trong lịch bảo vệ
export interface MemberResult {
  id: string;
  defenseScheduleId: string;
  studentId: string;
  result: string;
  feedback: string | null;
  evaluatedBy: string | null;
  evaluatedAt: string | null;
  isDeleted: boolean;
  student: {
    id: string;
    studentCode: string;
    user: {
      fullName: string | null;
      email: string | null;
    };
  };
}

// Tài liệu liên quan đến lịch bảo vệ
export interface DefenseScheduleDocument {
  fileName: string;
  fileUrl: string;
}