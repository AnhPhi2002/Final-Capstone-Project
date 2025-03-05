import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

export const importMentors = createAsyncThunk<
  any,
  { formData: FormData },
  { rejectValue: string }
>("importMentors/import", async ({ formData }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  // Log FormData trước khi gửi
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    const response = await axiosClient.post("/import/lecturers", formData, {
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
});

const importMentorSlice = createSlice({
  name: "importMentors",
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
      .addCase(importMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importMentors.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(importMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra!";
      });
  },
});

export const { resetState } = importMentorSlice.actions;
export default importMentorSlice.reducer;
