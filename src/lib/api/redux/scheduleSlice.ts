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

export const addReportDefenseUrl = createAsyncThunk(
  "schedule/addReportDefenseUrl",
  async (
    { scheduleId, url }: { scheduleId: string; url: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(
        `/council-defense/schedules/${scheduleId}/add-url`,
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

// Thunk để cập nhật trạng thái phòng họp
export const updateMeetingStatus = createAsyncThunk(
  "schedule/updateMeetingStatus",
  async (
    {
      scheduleId,
      semesterId,
      status,
      notes,
    }: {
      scheduleId: string;
      semesterId: string;
      status: "PENDING" | "ACTIVE" | "COMPLETE" | "CANCELED";
      notes?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(
        `/council-defense/schedules/${scheduleId}/update?semesterId=${semesterId}`,
        { status, notes }
      );
      return response.data; // Giả sử API trả về dữ liệu thành công
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật trạng thái!"
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
      // Xử lý addReportUrl
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
      })
      // Xử lý addReportDefenseUrl
      .addCase(addReportDefenseUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addReportDefenseUrl.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addReportDefenseUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý updateMeetingStatus
      .addCase(updateMeetingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMeetingStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMeetingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;