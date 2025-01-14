// Define possible statuses for Group
export type GroupStatus = "active" | "inactive" | "pending";

// Define the Group interface
export interface Group {
  id: number; // Primary key
  group_code: string; // Unique key
  semester_id: number; // Foreign key
  status: GroupStatus; // Enum for status
  is_auto_created: boolean;
  created_by: number; // Foreign key
  max_members: number;
  is_multi_major: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  mentor_1_id: string | null; // Nullable
  mentor_2_id: string | null; // Nullable
  group_members?: GroupMember[]; // Optional array of GroupMember
}

// Define possible roles for GroupMember
export type Role = "member" | "leader" | "assistant";

// Define possible statuses for GroupMember
export type Status = "active" | "inactive" | "left";

// Define the GroupMember interface
export interface GroupMember {
  id: number; // Primary key
  group_id: number; // Foreign key to Group
  student_id: number; // Foreign key to Student
  role: Role; // Enum for role
  joined_at: string; // ISO date string
  leave_at: string | null; // Nullable ISO date string
  leave_reason: string | null; // Nullable reason for leaving
  is_active: boolean; // Current active status
  status: Status; // Enum for status
  group?: Group; // Optional reference to Group
}
