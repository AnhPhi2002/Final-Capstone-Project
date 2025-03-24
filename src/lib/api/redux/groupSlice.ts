import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Group } from "../types";

// Định nghĩa kiểu dữ liệu cho nhóm


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

export const fetchGroupsWithoutSemester = createAsyncThunk(
  "groups/fetchWithoutSemester",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/groups/my-groups`);
      console.log("Raw API response:", response.data); // Log dữ liệu thô
      // Kiểm tra xem response.data.data có phải mảng không
      if (!Array.isArray(response.data.data)) {
        throw new Error("Dữ liệu trả về không phải là mảng!");
      }
      const groups = response.data.data.map((item: any) => item.group);
      console.log("Mapped groups:", groups); // Log dữ liệu sau khi ánh xạ
      return groups; // Trả về Group[]
    } catch (error: any) {
      console.log("API error:", error); // Log lỗi nếu có
      return rejectWithValue(error.message || "Lỗi khi lấy danh sách nhóm!");
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

      .addCase(fetchGroupsWithoutSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupsWithoutSemester.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroupsWithoutSemester.rejected, (state, action) => {
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
