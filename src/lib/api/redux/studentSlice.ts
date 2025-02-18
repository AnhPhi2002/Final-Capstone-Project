// studentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '@/lib/api/config/axios-client';
import { Student } from '@/lib/api/types';

type StudentState = {
  students: Student[];
  loading: boolean;
  error: string | null;
};

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

// Thunk để gọi API lấy danh sách sinh viên theo semesterId
export const fetchStudentsBySemester = createAsyncThunk(
  'students/fetchBySemester',
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/student/${semesterId}`);
      return response.data.data; // Trả về mảng "data" từ response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);

// Thunk để gọi API xóa tất cả sinh viên theo semesterId
export const deleteAllStudentsBySemester = createAsyncThunk(
  'students/deleteBySemester',
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/student/semester/${semesterId}`);
      return response.data; // Trả về kết quả từ response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete students');
    }
  }
);


const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsBySemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsBySemester.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentsBySemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAllStudentsBySemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllStudentsBySemester.fulfilled, (state) => {
        state.loading = false;
        state.students = []; // Xóa danh sách sinh viên trong state
      })
      .addCase(deleteAllStudentsBySemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const studentReducer = studentSlice.reducer;
