// Các trạng thái có thể có của Nhóm
export type GroupStatus = "active" | "inactive" | "pending";

export interface Group {
  id: string; 
  group_code: string;
  semester_id: string; 
  created_by: string; 
  year: string;
  code: string;
  start_date: string;
  end_date: string;
  status: GroupStatus;
  is_auto_created: boolean;
  max_members: number;
  is_multi_major: boolean;
  created_at: string;
  updated_at: string;
  mentor_1_id: string | null;
  mentor_2_id: string | null;
  group_members?: GroupMember[];
}


// Các vai trò có thể có trong nhóm
export type Role = "member" | "leader" ;

// Các trạng thái có thể có của thành viên nhóm
export type Status = "active" | "inactive";

// Định nghĩa thông tin của thành viên trong nhóm
export interface GroupMember {
  id: number; // Khóa chính của thành viên nhóm
  group_id: number; // ID của nhóm mà thành viên thuộc về
  student_id: number; // ID của sinh viên
  role: Role; // Vai trò của sinh viên trong nhóm
  joined_at: string; // Ngày tham gia nhóm (ISO date string)
  leave_at: string | null; // Ngày rời nhóm (có thể null)
  leave_reason: string | null; // Lý do rời nhóm (có thể null)
  is_active: boolean; // Trạng thái hoạt động của sinh viên trong nhóm
  status: Status; // Trạng thái hiện tại của sinh viên
}
