  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import { axiosClient } from "@/lib/api/config/axios-client";


  export type RoleType = "leader" | "member";

  export interface GroupMember {
    id: string;
    groupId: string;
    studentId: string;
    joinedAt: string;
    leaveAt: string | null;
    leaveReason: string | null;
    isActive: boolean;
    status: "ACTIVE" | "INACTIVE";
    student: {
      id: string;
      studentCode: string;
      user: {
        username: string;
        email: string;
        profession: string;
        specialty: string;
      };
    };
    role: {
      id: string;
      name: RoleType;
    };
  }

  export interface GroupDetail {
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
  }

  interface GroupDetailState {
    group: Record<string, GroupDetail>;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: GroupDetailState = {
    group: {},
    loading: false,
    error: null,
  };

  // 🟢 Fetch chi tiết nhóm theo groupId + semesterId
  export const fetchGroupDetail = createAsyncThunk(
    "groupDetail/fetchGroupDetail",
    async (
      { groupId, semesterId }: { groupId: string; semesterId: string },
      { rejectWithValue }
    ) => {
      try {
        const res = await axiosClient.get(`/groups/info/${groupId}`, {
          params: { semesterId },
        });
        return res.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Lỗi khi lấy nhóm!");
      }
    }
  );

  export const groupDetailSlice = createSlice({
    name: "groupDetail",
    initialState,
    reducers: {
      resetGroupDetail: (state) => {
        state.group = {};
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGroupDetail.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchGroupDetail.fulfilled, (state, action) => {
          state.loading = false;
          const data = action.payload as GroupDetail;
          if (data?.id) {
            state.group[data.id] = data; // Gán cả object GroupDetail, không chỉ members
          }
        })
        
        .addCase(fetchGroupDetail.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  export const { resetGroupDetail } = groupDetailSlice.actions;
  export default groupDetailSlice.reducer;
