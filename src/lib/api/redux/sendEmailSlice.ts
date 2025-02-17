import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

// 🛠 Cập nhật kiểu dữ liệu để phản ánh API mới
export const sendEmails = createAsyncThunk(
  "emails/send",
  async (
    {
      semesterId,
      qualificationStatus,
      emailType,
    }: { semesterId: string; qualificationStatus: string; emailType: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        semesterId,
        qualificationStatus,
        emailType, // Chỉ gửi emailType (tên template)
      };

      const response = await axiosClient.post("/send-qualification-emails", payload);
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
      });
  },
});

export const { resetState } = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
