import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface ScheduleState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ScheduleState = {
  loading: false,
  error: null,
  success: false,
};

// Thunk để thêm URL vào schedule
export const addReportUrl = createAsyncThunk(
  "schedule/addReportUrl",
  async (
    { scheduleId, url }: { scheduleId: string; url: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(
        `/council-review/schedules/${scheduleId}/add-url`,
        { url }
      );
      return response.data; // Giả sử API trả về dữ liệu thành công
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi thêm URL!"
      );
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetSchedule: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReportUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addReportUrl.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addReportUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;