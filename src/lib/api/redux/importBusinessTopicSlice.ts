// importStudentSlice.ts (hoặc rename lại thành importBusinessTopicSlice.ts)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

export const importBussinessTopic = createAsyncThunk<
  any,
  { formData: FormData; semesterId: string; submissionPeriodId: string },
  { rejectValue: string }
>(
  "importBussinessTopic/import",
  async ({ formData, semesterId, submissionPeriodId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosClient.post("/business/topics/import", formData, {
        params: { semesterId, submissionPeriodId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Có lỗi xảy ra!");
    }
  }
);

const importBussinessTopicSlice = createSlice({
  name: "importBussinessTopic",
  initialState: { loading: false, success: false, error: null as string | null },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importBussinessTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importBussinessTopic.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(importBussinessTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra!";
      });
  },
});

export const { resetState } = importBussinessTopicSlice.actions;
export default importBussinessTopicSlice.reducer;
