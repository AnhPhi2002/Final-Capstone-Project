// @/lib/api/types/not-group-student.ts

export interface StudentNotGroup {
  id: string;
  userId: string;
  studentCode: string;
  majorId: string;
  specializationId: string;
  isEligible: boolean;
  personalEmail: string | null;
  status: string; // "PENDING", "APPROVED", etc.
  importAt: string;
  importSource: string;
  isImported: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    fullName: string | null;
    avatar: string | null;
    student_code: string;
    profession: string;
    specialty: string;
    programming_language: string | null;
    isActive: boolean;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
  };
  major?: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  specialization?: {
    id: string;
    majorId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StudentNotGroupForStudent {
  id: string;
  studentCode: string;
  studentName: string;
  email: string;
  major: string;
}