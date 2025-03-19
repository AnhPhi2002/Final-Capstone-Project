import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

// Định nghĩa kiểu dữ liệu cho nhóm
interface Group {
  id: string;
  groupCode: string;
  semesterId: string;
  status: string;
  isAutoCreated: boolean;
  createdBy: string;
  maxMembers: number;
  isMultiMajor: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  topicEnglish: string | null;
  topicTiengViet: string | null;
  totalMembers: number;
  members: {
    id: string;
    groupId: string;
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
  }[]
}

type GroupState = {
  groups: Group[];
  loading: boolean;
  error: string | null;
};

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

// Fetch danh sách nhóm theo `semesterId`
export const fetchGroupsBySemester = createAsyncThunk(
  "groups/fetchBySemester",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/groups/semester/${semesterId}`);
      return response.data.groups; // Trả về danh sách nhóm
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy danh sách nhóm!");
    }
  }
);

// Action để tạo nhóm mới
export const createGroup = createAsyncThunk(
  "groups/create",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/create?semesterId=${semesterId}`, { semesterId });
      return response.data.group; // Trả về nhóm mới được tạo
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi tạo nhóm!");
    }
  }
);

export const inviteStudentToGroup = createAsyncThunk(
  "groups/invite",
  async ({ groupId, studentId }: { groupId: string; studentId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/groups/invite", { groupId, studentId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi mời sinh viên!");
    }
  }
);


const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch groups
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
      })

      // Create group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload) {
          state.groups = [...state.groups, action.payload]; // Thêm nhóm mới vào danh sách
        }
      })
      
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const groupReducer = groupSlice.reducer;
