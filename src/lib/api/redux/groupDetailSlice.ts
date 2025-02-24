import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { toast } from "sonner";

export type RoleType = "leader" | "member";

export interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  role: RoleType;
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

const initialState: GroupDetailState = {
  group: null,
  loading: false,
  error: null,
};

// **🔹 Fetch nhóm theo ID**
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

// **🔹 Đổi Leader**
export const changeLeader = createAsyncThunk(
  "groupDetail/changeLeader",
  async ({ groupId, newLeaderId }: { groupId: string; newLeaderId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/groups/change-leader`, { groupId, newLeaderId });
      toast.success("Leader đã được cập nhật!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi đổi leader!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi đổi leader!");
    }
  }
);

// **🔹 Xóa thành viên**
export const removeMemberFromGroup = createAsyncThunk(
  "groupDetail/removeMember",
  async ({ groupId, memberId }: { groupId: string; memberId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/groups/remove-member/${groupId}/${memberId}`);
      toast.success("Thành viên đã bị xóa!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xóa thành viên!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi xóa thành viên!");
    }
  }
);

// **🔹 Mời thành viên**
export const inviteMember = createAsyncThunk(
  "groupDetail/inviteMember",
  async ({ groupId, email }: { groupId: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/invite`, { groupId, email });
      toast.success("Lời mời đã được gửi!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi mời thành viên!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi mời thành viên!");
    }
  }
);

// **🔹 Xóa nhóm**
export const deleteGroup = createAsyncThunk(
  "groupDetail/deleteGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/groups/delete/${groupId}`);
      toast.success("Nhóm đã được xóa thành công!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xóa nhóm!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi xóa nhóm!");
    }
  }
);

// **🔹 Rời nhóm**
export const leaveGroup = createAsyncThunk(
  "groupDetail/leaveGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/leave`, { groupId });
      toast.success("Bạn đã rời nhóm thành công!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi rời nhóm!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi rời nhóm!");
    }
  }
);

// **🔹 Khóa nhóm**
export const lockGroup = createAsyncThunk(
  "groupDetail/lockGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/lock`, { groupId });
      toast.success("Nhóm đã bị khóa!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi khóa nhóm!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi khóa nhóm!");
    }
  }
);

// **🔹 Mở khóa nhóm**
export const unlockGroup = createAsyncThunk(
  "groupDetail/unlockGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/unlock`, { groupId });
      toast.success("Nhóm đã được mở khóa!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi mở khóa nhóm!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi mở khóa nhóm!");
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
      .addCase(changeLeader.fulfilled, (state, action) => {
        if (state.group) {
          state.group.members = state.group.members.map((member) =>
            member.studentId === action.payload.newLeaderId
              ? { ...member, role: "leader" }
              : member.role === "leader"
              ? { ...member, role: "member" }
              : member
          );
        }
      })
      .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
        if (state.group) {
          state.group.members = state.group.members.filter(
            (member) => member.id !== action.payload.memberId
          );
        }
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.group = null;
      })
      .addCase(lockGroup.fulfilled, (state) => {
        if (state.group) state.group.status = "LOCKED";
      })
      .addCase(unlockGroup.fulfilled, (state) => {
        if (state.group) state.group.status = "ACTIVE";
      });
  },
});

export default groupDetailSlice.reducer;
