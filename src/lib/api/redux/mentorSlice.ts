// src/lib/api/redux/mentorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '@/lib/api/config/axios-client';
import { Mentor } from '@/lib/api/types'; 

type MentorState = {
  mentors: Mentor[];
  loading: boolean;
  error: string | null;
};

const initialState: MentorState = {
  mentors: [],
  loading: false,
  error: null,
};

export const fetchMentorsBySemesterId = createAsyncThunk(
  'mentors/fetchMentorsBySemesterId',
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/import/lecturers?semesterId=${semesterId}`);
      const mentors: Mentor[] = response.data.data.map((item: any) => ({
        id: item.id || item.Id,
        email: item.email || item.Email,
        username: item.username || item.Username,
        lecturerCode: item.lecturerCode || item.LecturerCode,
        fullName: item.fullName || item.FullName,
        isActive: item.isActive || item.IsActive,
        role: item.role || item.Role,
        department: item.department || item.Department,
        departmentPosition: item.departmentPosition || item.DepartmentPosition,
      }));
      return mentors; // Trả về mảng mentors trực tiếp
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy danh sách mentor');
    }
  }
);

const mentorSlice = createSlice({
  name: 'mentors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorsBySemesterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentorsBySemesterId.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload.sort((a, b) => {
          const numA = parseInt(a.lecturerCode.replace('L', ''));
          const numB = parseInt(b.lecturerCode.replace('L', ''));
          return numA - numB;
        });
      })
      .addCase(fetchMentorsBySemesterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const mentorReducer = mentorSlice.reducer;