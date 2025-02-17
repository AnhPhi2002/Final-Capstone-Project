import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

interface GroupMember {
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
    studentCode: string;
    user: {
      username: string;
      email: string;
      profession: string;
      specialty: string;
    };
  };
}

interface GroupDetailState {
  group: {
    id: string;
    groupCode: string;
    status: string;
    maxMembers: number;
    isMultiMajor: boolean;
    createdAt: string;
    updatedAt: string;
    mentor1Id: string | null;
    mentor2Id: string | null;
    members: GroupMember[];
  } | null;
  loading: boolean;
  error: string | null;
}

// **🔹 Initial State**
const initialState: GroupDetailState = {
  group: null,
  loading: false,
  error: null,
};

// **🔹 Async Thunk để fetch nhóm theo ID**
export const fetchGroupDetail = createAsyncThunk(
  "groupDetail/fetchGroupDetail",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/groups/info/${groupId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi tải dữ liệu nhóm!");
    }
  }
);

// **🔹 Redux Slice**
const groupDetailSlice = createSlice({
  name: "groupDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
      })
      .addCase(fetchGroupDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupDetailSlice.reducer;
