export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string | null;
  lecturerCode: string | null;
  departmentPosition: string | null;
  department: string | null;
  avatar: string | null;
  student_code: string | null;
  profession: string | null;
  specialty: string | null;
  programming_language: string | null;
  gender: string | null;
  phone: string | null;
  personal_Email: string | null;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  roles: {
    id: string;
    userId: string;
    roleId: string;
    semesterId: string;
    assignedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    role: {
      id: string;
      name: string;
      description: string;
      isSystemWide: boolean;
      permissions: any;
      isActive: boolean;
      createdAt: string;
      isDeleted: boolean;
    };
    semester: {
      id: string;
      code: string;
    };
  }[];
}