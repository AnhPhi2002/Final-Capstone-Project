import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

// **🔹 Async Thunk để mời thành viên**
export const inviteMember = createAsyncThunk(
  "group/inviteMember",
  async ({ groupId, email }: { groupId: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/groups/invite", { groupId, email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi mời thành viên!");
    }
  }
);

// **🔹 Redux Slice**
const groupInviteSlice = createSlice({
  name: "groupInvite",
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(inviteMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(inviteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupInviteSlice.reducer;
