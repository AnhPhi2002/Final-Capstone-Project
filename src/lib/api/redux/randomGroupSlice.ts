import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

// Async Thunk để gọi API tạo nhóm ngẫu nhiên
export const createRandomGroup = createAsyncThunk(
  "groups/createRandom",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/groups/randomize", { semesterId });
      return response.data.groups; // Trả về danh sách nhóm được tạo
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi tạo nhóm ngẫu nhiên!");
    }
  }
);

const randomGroupSlice = createSlice({
  name: "randomGroups",
  initialState: {
    groups: [] as any[], // Lưu danh sách nhóm tạo ngẫu nhiên
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRandomGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRandomGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload; // Cập nhật danh sách nhóm mới
      })
      .addCase(createRandomGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const randomGroupReducer = randomGroupSlice.reducer;
