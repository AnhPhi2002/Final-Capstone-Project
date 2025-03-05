// types/year.ts
export type Year = {
    id: string;
    year: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export interface YearState {
    data: Year[];
    loading: boolean;
    error: string | null;
  }
  