// Trạng thái của Block 3W
export enum Block3WStatus {
  Active = "Active",
  Completed = "Completed",
  Pending = "Pending",
}

// Trạng thái đủ điều kiện của sinh viên
export enum StudentStatus {
  Qualified = "Qualified",
  NotQualified = "Not Qualified",
}

// Định nghĩa kiểu dữ liệu của sinh viên chưa có nhóm KLTN
export interface StudentNotGroup {
  id: number;
  email: string;
  major_id: string;
  specialty_id: string;
  block3w_status: Block3WStatus;
  status: StudentStatus;
}

// Định nghĩa học kỳ với danh sách sinh viên
export interface SemesterNotGroup {
  code: string;
  start_date: string;
  end_date: string;
  students: StudentNotGroup[];
}

// Định nghĩa năm học với danh sách học kỳ
export interface AcademicYear {
  id: number;
  year: string;
  semesters: SemesterNotGroup[];
}

// Định nghĩa danh sách các năm học
export type AcademicData = AcademicYear[];
