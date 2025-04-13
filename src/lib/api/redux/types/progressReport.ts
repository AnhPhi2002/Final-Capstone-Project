export interface Mentor {
  id: string;
  fullName: string;
  email: string;
  roleInGroup?: string;
}

export interface Group {
  id: string;
  groupCode: string;
}

export interface MentorReport {
  id: string;
  reportId: string;
  mentorId: string;
  isRead: boolean;
  readAt: string | null;
  feedback: string | null;
  isDeleted: boolean;
  mentor: Mentor;
}

export interface ProgressReport {
  id: string;
  groupId: string;
  mentorId: string;
  weekNumber: number;
  content: string;
  mentorFeedback: string | null;
  completionPercentage: number;
  status: 'ACTIVE' | 'SUBMITTED' | 'REVIEWED';
  submittedAt: string | null;
  reviewedAt: string | null;
  url: string | null;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  mentors: MentorReport[];
  group: Group;
  mentorFeedbacks: MentorFeedbacks[];
  isRead: boolean;
}

export interface MentorFeedbacks {
  mentorId: string;
  feedback: string | null;
  isRead: boolean;
  mentorName: string;
  mentorEmail: string;
  readAt: string | null;
}

export interface ProgressReportResponse {
  success: boolean;
  message: string;
  data: ProgressReport[] | ProgressReport;
}

export interface CreateProgressReportRequest {
  weekNumber: string;
  content: string;
  completionPercentage: number;
}