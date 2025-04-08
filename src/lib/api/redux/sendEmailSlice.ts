import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

// Cập nhật kiểu dữ liệu cho API mới
export const sendEmails = createAsyncThunk(
  "emails/send",
  async (
    { semesterId, templateId }: { semesterId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        semesterId,
        templateId,
      };

      const response = await axiosClient.post("/thesis-eligibility-notifications", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

export const sendEmailsGroupFormation = createAsyncThunk(
  "emails/sendEmailsGroupFormation",
  async (
    { semesterId, templateId }: { semesterId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        semesterId,
        templateId,
      };

      const response = await axiosClient.post("/group-formation-notification", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

export const sendEmailsInviteLecturerRegistration = createAsyncThunk(
  "emails/sendEmailsInviteLecturerRegistration",
  async (
    { semesterId, templateId }: { semesterId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        semesterId,
        templateId,
      };

      const response = await axiosClient.post("/invite-lecturers-topic-registration", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

export const sendTopicDecisionAnnouncement = createAsyncThunk(
  "emails/sendTopicDecisionAnnouncement",
  async (
    { semesterId, templateId }: { semesterId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        semesterId,
        templateId,
      };

      const response = await axiosClient.post("/topic-decision-announcement", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

export const sendApprovedTopicsNotification = createAsyncThunk(
  "emails/sendApprovedTopicsNotification",
  async (
    { semesterId, templateId }: { semesterId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        semesterId,
        templateId,
      };

      const response = await axiosClient.post("/approved-topics-notification", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

export const sendMailReviewSchedule = createAsyncThunk(
  "emails/sendMailReviewSchedule",
  async (
    { reviewScheduleId, templateId }: { reviewScheduleId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        reviewScheduleId,
        templateId,
      };

      const response = await axiosClient.post("/review-schedule-notification", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

export const sendMailDefenseSchedule = createAsyncThunk(
  "emails/sendMailDefenseSchedule",
  async (
    { reviewScheduleId, templateId }: { reviewScheduleId: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        reviewScheduleId,
        templateId,
      };

      const response = await axiosClient.post("/defense-schedule-notification", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gửi email thất bại");
    }
  }
);

const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState: { loading: false, error: null as string | null },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendTopicDecisionAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendTopicDecisionAnnouncement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendTopicDecisionAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendApprovedTopicsNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendApprovedTopicsNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendApprovedTopicsNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMailReviewSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMailReviewSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMailReviewSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMailDefenseSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMailDefenseSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMailDefenseSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const { resetState } = sendEmailSlice.actions;
export default sendEmailSlice.reducer;