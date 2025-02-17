import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

type EmailTemplateState = {
  templates: EmailTemplate[];
  loading: boolean;
  error: string | null;
};

const initialState: EmailTemplateState = {
  templates: [],
  loading: false,
  error: null,
};

// Thunk để lấy danh sách email templates
export const fetchEmailTemplates = createAsyncThunk(
  "emailTemplates/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/email-templates");
      return response.data; // API trả về mảng templates
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy danh sách email templates");
    }
  }
);

const emailTemplateSlice = createSlice({
  name: "emailTemplates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchEmailTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default emailTemplateSlice.reducer;
