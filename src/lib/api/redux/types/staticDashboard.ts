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
  }
  
  export interface GroupStatus {
    status: "ACTIVE" | "INACTIVE";
    total: number;
  }
  
  export interface TopicStatus {
    status: "PENDING" | "APPROVED" | "REJECTED";
    total: number;
  }
  
  export interface ReviewRound {
    round: string;
    total: number;
  }
  
  export interface DefenseRound {
    round: string;
    total: number;
  }
  
  export interface StudentGroupStatus {
    status: "Has Group" | "No Group";
    total: number;
  }
  
  export interface GroupTopicStatus {
    status: "Has Topic" | "No Topic";
    total: number;
  }