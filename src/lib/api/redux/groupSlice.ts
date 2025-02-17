import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

// Định nghĩa kiểu dữ liệu cho nhóm
interface Group {
  id: string;
  groupCode: string;
  semesterId: string;
  status: string;
  maxMembers: number;
  isMultiMajor: boolean;
  createdAt: string;
  updatedAt: string;
  mentor1Id: string | null;
  mentor2Id: string | null;
  members: {
    id: string;
    studentId: string;
    role: string;
    joinedAt: string;
    leaveAt: string | null;
    leaveReason: string | null;
    isActive: boolean;
    status: string;
    student: {
      id: string;
      userId: string;
      studentCode: string;
      majorId: string;
      specializationId: string;
      isEligible: boolean;
      personalEmail: string | null;
      status: string;
      user: {
        id: string;
        username: string;
        email: string;
        fullName: string | null;
        profession: string;
        specialty: string;
      };
    };
  }[];
}

// Fetch danh sách nhóm theo `semesterId`
export const fetchGroupsBySemester = createAsyncThunk(
  "groups/fetchBySemester",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/groups/semester?semesterId=${semesterId}`);
      return response.data.groups; // Trả về danh sách nhóm
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy danh sách nhóm!");
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [] as Group[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsBySemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupsBySemester.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroupsBySemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const groupReducer = groupSlice.reducer;
