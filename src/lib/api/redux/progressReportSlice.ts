import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';
import { CreateProgressReportRequest, ProgressReport } from './types/progressReport';

interface ProgressReportState {
  reports: ProgressReport[] | null;
  selectedReport: ProgressReport | null;
  loading: boolean;
  error: string | null;
  fetchSuccess: boolean; // Success cho việc lấy danh sách hoặc chi tiết
  createSuccess: boolean; // Success cho việc tạo báo cáo
}

const initialState: ProgressReportState = {
  reports: null,
  selectedReport: null,
  loading: false,
  error: null,
  fetchSuccess: false,
  createSuccess: false,
};

// Thunk để lấy danh sách báo cáo
export const fetchMyReports = createAsyncThunk(
  'progressReport/fetchMyReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/progress-report/my-reports');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi lấy danh sách báo cáo!'
      );
    }
  }
);

// Thunk để tạo báo cáo mới
export const createProgressReport = createAsyncThunk(
  'progressReport/createProgressReport',
  async (data: CreateProgressReportRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClient.post('/progress-report/create', data);
      await dispatch(fetchMyReports()); // Cập nhật danh sách sau khi tạo
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi tạo báo cáo!'
      );
    }
  }
);

// Thunk để lấy chi tiết báo cáo
export const fetchReportDetail = createAsyncThunk(
  'progressReport/fetchReportDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/progress-report/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi lấy chi tiết báo cáo!'
      );
    }
  }
);

export const updateProgressReport = createAsyncThunk(
  'progressReport/updateProgressReport',
  async (
    { reportId, content, completionPercentage }: { reportId: string; content: string; completionPercentage: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axiosClient.put(`/progress-report/${reportId}`, {
        content,
        completionPercentage,
      });
      await dispatch(fetchMyReports());
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi cập nhật báo cáo!'
      );
    }
  }
);

const progressReportSlice = createSlice({
  name: 'progressReport',
  initialState,
  reducers: {
    resetProgressReport: (state) => {
      state.loading = false;
      state.error = null;
      state.fetchSuccess = false;
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchMyReports
      .addCase(fetchMyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fetchSuccess = false;
      })
      .addCase(fetchMyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
        state.fetchSuccess = true;
      })
      .addCase(fetchMyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý createProgressReport
      .addCase(createProgressReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createProgressReport.fulfilled, (state) => {
        state.loading = false;
        state.createSuccess = true;
        // Danh sách reports đã được cập nhật bởi fetchMyReports trong thunk
      })
      .addCase(createProgressReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý fetchReportDetail
      .addCase(fetchReportDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fetchSuccess = false;
      })
      .addCase(fetchReportDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReport = action.payload;
        state.fetchSuccess = true;
      })
      .addCase(fetchReportDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProgressReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgressReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProgressReport.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      ;
  },
});

export const { resetProgressReport } = progressReportSlice.actions;
export default progressReportSlice.reducer;