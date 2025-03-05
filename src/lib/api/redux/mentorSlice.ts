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
    "mentors/fetchMentors",
    async (semesterId: string, { rejectWithValue }) => {
      try {
        const response = await axiosClient.get(`/import/lecturers?semesterId=${semesterId}`);
        console.log("API response:", response.data); // Kiểm tra API trả về gì
        return response.data; 
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Không thể lấy danh sách mentor");
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
            state.mentors = action.payload.data || []; // Đảm bảo lưu `data` là mảng
          })
          
        .addCase(fetchMentorsBySemesterId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });

  export const mentorReducer = mentorSlice.reducer;