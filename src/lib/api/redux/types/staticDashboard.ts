// src/lib/api/types.ts
export interface Semester {
  id: string;
  code: string;
  status: "ACTIVE" | "UPCOMING" | "COMPLETE" | "UNKNOWN";
  isDeleted: boolean;
}

export interface StudentQualificationStatus {
  status: "Qualified" | "Not Qualified";
  total: number;
  percentage?: number;
}

export interface GroupStatus {
  status: "ACTIVE" | "INACTIVE";
  total: number;
  percentage?: number;
}

export interface TopicStatus {
  status: "PENDING" | "APPROVED" | "REJECTED";
  total: number;
  percentage?: number;
}

export interface ReviewRound {
  round: string;
  total: number;
  percentage?: number;
}

export interface DefenseRound {
  round: string;
  total: number;
  percentage?: number;
}

export interface StudentGroupStatus {
  status: "Has Group" | "No Group";
  total: number;
  percentage?: number;
}

export interface GroupTopicStatus {
  status: "Has Topic" | "No Topic";
  total: number;
  percentage?: number;
}

export interface DefenseResultSummary {
  status: "PENDING" | "PASS" | "NOT_PASS";
  total: number;
  percentage?: number;
}

export interface DefenseResultByRound {
  round: number;
  PASS: number;
  NOT_PASS: number;
  PASS_percentage: number;
  NOT_PASS_percentage: number;
}

export interface GroupCreationType {
  totalGroups: number;
  breakdown: {
    type: "Auto Created" | "Manually Created";
    total: number;
    percentage: number;
  }[];
}