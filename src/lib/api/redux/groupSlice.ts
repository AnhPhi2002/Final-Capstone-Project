import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Group, GroupWithDetails } from "../types";

// Định nghĩa kiểu dữ liệu cho nhóm


type GroupState = {
  groupsDetails: GroupWithDetails[];
  groups: Group[];
  loading: boolean;
  error: string | null;
};

const initialState: GroupState = {
  groupsDetails: [],
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
      return response.data.groups;
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

      if (!Array.isArray(response.data.data)) {
        throw new Error("Dữ liệu trả về không phải là mảng!");
      }

      // Trả về chính xác mảng dữ liệu từ API mà không map sai thuộc tính
      return response.data.data as GroupWithDetails[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi lấy danh sách nhóm!");
    }
  }
);


// Action để tạo nhóm mới
export const createGroup = createAsyncThunk(
  "groups/create",
  async (__,{ rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/create`);
      return response.data.group; // Trả về nhóm mới được tạo
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi tạo nhóm!");
    }
  }
);

export const createGroupForAcademic = createAsyncThunk(
  "groups/createForAcademic",
  async (
    { leaderEmail, semesterId }: { leaderEmail: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        "/groups/create-group-by-academic",
        {
          leaderEmail,
          semesterId,
        }
      );
      return response.data.group;
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
        state.groupsDetails = action.payload;
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
      
      .addCase(createGroup.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(createGroupForAcademic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroupForAcademic.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload) {
          state.groups = [...state.groups, action.payload]; // Thêm nhóm mới vào danh sách
        }
      })
      
      .addCase(createGroupForAcademic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const groupReducer = groupSlice.reducer;
