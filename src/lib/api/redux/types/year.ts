// types/year.ts
export type Year = {
    id: string;
    year: number;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean; // 👈 Thêm dòng này
  };
  
  export interface YearState {
    data: Year[];
    loading: boolean;
    error: string | null;
  }
  