import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { toast } from "sonner";

export type RoleType = "leader" | "member";

export interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  // role: RoleType;
  joinedAt: string;
  leaveAt: string | null;
  leaveReason: string | null;
  isActive: boolean;
  status: string;
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
  async ({ groupId, semesterId }: { groupId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient({
        url: `/groups/info/${groupId}`,
        method: "GET", // ✅ Ghi đè phương thức thành GET
        data: { semesterId }, // 🚀 Truyền body dù là GET request
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      const response = await axiosClient.post(`/groups/change-leader`, { groupId, newLeaderId });
      toast.success("Leader đã được cập nhật!");
      return response.data;
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi đổi leader!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi đổi leader!");
    }
  }
);

// **🔹 Xóa thành viên (Cập nhật sang `POST`)**
export const removeMemberFromGroup = createAsyncThunk(
  "groupDetail/removeMember",
  async ({ groupId, studentId }: { groupId: string; studentId: string }, { rejectWithValue }) => {
    try {
      await axiosClient.post(`/groups/remove-member`, {
        groupId,
        memberId: studentId, // ✅ Đảm bảo memberId là studentId
      });

      toast.success("Thành viên đã bị xóa!");
      return { groupId, studentId };
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xóa thành viên!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi xóa thành viên!");
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
            member.role.name === action.payload.newLeaderId
              ? { ...member, role: {...member.role, name: "leader"} }
              : member.role.name === "leader"
              ? { ...member, role: {...member.role, name: "member"} }
              : member
          );
        }
      })
      .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
        if (state.group) {
          state.group.members = state.group.members.filter(
            (member) => member.studentId !== action.payload.studentId
          );
        }
      });
  },
});

export default groupDetailSlice.reducer;
