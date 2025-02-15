import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

type SendEmailState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: SendEmailState = {
  loading: false,
  success: false,
  error: null,
};

export const sendEmails = createAsyncThunk<
  any,
  { semesterId: string; qualificationStatus: string },
  { rejectValue: string }
>("sendEmail/send", async ({ semesterId, qualificationStatus }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/send-emails", {
      semesterId,
      qualificationStatus,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to send emails");
  }
});


const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendEmails.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send emails";
      });
  },
});

export const { resetState } = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
