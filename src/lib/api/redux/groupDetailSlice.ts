import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { toast } from "sonner";

export type RoleType = "leader" | "member";

export interface GroupMember {
  id: string;
  groupId: string;
  studentId: string;
  joinedAt: string;
  leaveAt: string | null;
  leaveReason: string | null;
  isActive: boolean;
  status: "ACTIVE" | "INACTIVE"; // ✅ Cập nhật kiểu dữ liệu
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
  // updatingMember: boolean;
  error: string | null;
}

const initialState: GroupDetailState = {
  group: null,
  loading: false,
  // updatingMember: false,
  error: null,
};

// **🔹 Fetch nhóm theo ID**
export const fetchGroupDetail = createAsyncThunk(
  "groupDetail/fetchGroupDetail",
  async (
    { groupId, semesterId }: { groupId: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(`/groups/info/${groupId}`, {
        params: { semesterId }, // ✅ Truyền `semesterId` vào query params
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
  async ({ groupId, newLeaderId, semesterId }: { groupId: string; newLeaderId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/groups/change-leader`, { groupId, newLeaderId }, {
        params: { semesterId }
      });
      // toast.success("Leader đã được cập nhật!");
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
  async (
    { groupId, studentId, semesterId }: { groupId: string; studentId: string; semesterId: string },
    { rejectWithValue }
  ) => {
    console.log("removeMemberFromGroup - Input:", { groupId, studentId, semesterId }); // Log dữ liệu
    try {
      await axiosClient.post(
        `/groups/remove-member`,
        {
          groupId,
          memberId: studentId,
        },
        {
          params: { semesterId },
        }
      );

      toast.success("Thành viên đã bị xóa!");
      return { groupId, studentId };
    } catch (error: any) {
      console.error("removeMemberFromGroup - Error:", error.response?.data); // Log lỗi chi tiết
      toast.error(error?.message || "Lỗi khi xóa thành viên!");
      return rejectWithValue(error.response?.data?.message || "Lỗi khi xóa thành viên!");
    }
  }
);

export const toggleMemberStatus = createAsyncThunk(
  "groupDetail/toggleMemberStatus",
  async (
    { groupCode, memberEmail, newStatus, semesterId }: { groupCode: string; memberEmail: string; newStatus: "ACTIVE" | "INACTIVE"; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
  await axiosClient.post(
        `/groups/toggle-member-status`,
        {
          groupCode,
          memberEmail,
          newStatus,
        },
        {
          params: { semesterId },
        }
      );

      toast.success(`Cập nhật trạng thái thành công: ${newStatus === "ACTIVE" ? "Hoạt động" : "Ngừng hoạt động"}`);
      return { memberEmail, newStatus };
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi cập nhật trạng thái thành viên!");
      return rejectWithValue(error.response?.data?.message || "Lỗi hệ thống!");
    }
  }
);
// **🔹 Redux Slice**
const groupDetailSlice = createSlice({
  name: "groupDetail",
  initialState,
  reducers: {
    resetGroupDetail: (state) => {
      state.group = null;
      state.loading = false;
      // state.updatingMember = false;
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
        state.group = action.payload || null; // Đảm bảo gán null nếu không có dữ liệu
      })
      .addCase(fetchGroupDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi khi tải nhóm";
        state.group = null;
      })
      .addCase(changeLeader.fulfilled, (state, action) => {
        if (state.group) {
          state.group.members = state.group.members.map((member) =>
            member.role.name === action.payload.newLeaderId
              ? { ...member, role: { ...member.role, name: "leader" } }
              : member.role.name === "leader"
                ? { ...member, role: { ...member.role, name: "member" } }
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
      })
      .addCase(toggleMemberStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleMemberStatus.fulfilled, (state) => {
        state.loading = false;
        // toast.success("Cập nhật trạng thái thành viên thành công!");
      })
      .addCase(toggleMemberStatus.rejected, (state) => {
        state.loading = false;
        // const errorMessage = typeof action.payload === "object" && action.payload?.message
        //   ? action.payload.message
        //   : "Lỗi hệ thống khi cập nhật trạng thái!";
          
        // toast.error(errorMessage); // ✅ Hiển thị lỗi đúng từ API
      });
      
  },
});
export const { resetGroupDetail } = groupDetailSlice.actions;
export default groupDetailSlice.reducer;
