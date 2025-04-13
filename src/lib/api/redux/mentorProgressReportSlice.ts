import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';
import { ProgressReport } from './types/progressReport';

interface MentorProgressReportState {
  reports: ProgressReport[] | null;
  loading: boolean;
  error: string | null;
  feedbackLoading: boolean;
  feedbackError: string | null;
}

const initialState: MentorProgressReportState = {
  reports: null,
  loading: false,
  error: null,
  feedbackLoading: false,
  feedbackError: null,
};

export const fetchMentorReports = createAsyncThunk(
  'mentorProgressReport/fetchMentorReports',
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/progress-report/mentor?semesterId=${semesterId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi lấy danh sách báo cáo của mentor!'
      );
    }
  }
);

export const sendFeedback = createAsyncThunk(
  'mentorProgressReport/sendFeedback',
  async (
    { reportId, semesterId, mentorFeedback }: { reportId: string; semesterId: string; mentorFeedback: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        `/progress-report/${reportId}/feedback?semesterId=${semesterId}`,
        { mentorFeedback }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || 'Lỗi khi gửi phản hồi!'
      );
    }
  }
);

export const createReportPeriod = createAsyncThunk(
  'mentorProgressReport/createReportPeriod',
  async (
    {
      semesterId,
      groupId,
      weekNumber,
      startDate,
      endDate,
    }: { semesterId: string; groupId: string; weekNumber: number; startDate: string; endDate: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        `/progress-report/period?semesterId=${semesterId}`,
        { groupId, weekNumber, startDate, endDate }
      );
      return { data: response.data.data, semesterId }; // <- return cả semesterId
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi tạo lịch báo cáo!'
      );
    }
  }
);

export const deleteReportPeriod = createAsyncThunk(
  'mentorProgressReport/deleteReportPeriod',
  async (
    { reportId, semesterId }: { reportId: string; semesterId: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axiosClient.put(`/progress-report/${reportId}/delete`, {
        isDeleted: true,
      });
      await dispatch(fetchMentorReports(semesterId)); // Cập nhật lại danh sách
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi xóa lịch báo cáo!");
    }
  }
);


const mentorProgressReportSlice = createSlice({
  name: 'mentorProgressReport',
  initialState,
  reducers: {
    resetMentorProgressReport: (state) => {
      state.reports = null;
      state.loading = false;
      state.error = null;
      state.feedbackLoading = false;
      state.feedbackError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentorReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchMentorReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendFeedback.pending, (state) => {
        state.feedbackLoading = true;
        state.feedbackError = null;
      })
      .addCase(sendFeedback.fulfilled, (state, action) => {
        state.feedbackLoading = false;
        if (state.reports) {
          const index = state.reports.findIndex((r) => r.id === action.meta.arg.reportId);
          if (index !== -1) {
            state.reports[index] = { ...state.reports[index], mentorFeedback: action.meta.arg.mentorFeedback };
          }
        }
      })
      .addCase(sendFeedback.rejected, (state, action) => {
        state.feedbackLoading = false;
        state.feedbackError = action.payload as string;
      })
      .addCase(createReportPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReportPeriod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createReportPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteReportPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportPeriod.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReportPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      ;
  },
});

export const { resetMentorProgressReport } = mentorProgressReportSlice.actions;
export default mentorProgressReportSlice.reducer;