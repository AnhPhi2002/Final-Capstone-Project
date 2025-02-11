// Trạng thái có thể có của sinh viên trong block 3W
export type Block3wStatusNotGroup = "Active" | "Inactive";

// Trạng thái đủ điều kiện của sinh viên
export type StudentStatusNotGroup = "Qualified" | "Pending" | "Rejected";

// Định nghĩa thông tin sinh viên
export interface StudentNotGroup {
  id: number;
  email: string;
  major_id: string;
  specialty_id: string;
  block3w_status: Block3wStatusNotGroup;
  status: StudentStatusNotGroup;
}

// Định nghĩa học kỳ với danh sách sinh viên
export interface SemesterNotGroup {
  id: number;
  year: string;
  code: string;
  start_date: string;
  end_date: string;
  students: StudentNotGroup[];
}

// Danh sách các học kỳ
export type SemesterListNotGroup = SemesterNotGroup[];
