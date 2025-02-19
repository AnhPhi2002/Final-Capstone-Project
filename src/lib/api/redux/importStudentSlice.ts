import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

export const importStudents = createAsyncThunk<
  any,
  { formData: FormData },
  { rejectValue: string }
>("importStudents/import", async ({ formData }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  // Log FormData trước khi gửi
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    const response = await axiosClient.post("/import/import-students", formData, {
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

const importStudentSlice = createSlice({
  name: "importStudents",
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
      .addCase(importStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importStudents.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(importStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra!";
      });
  },
});

export const { resetState } = importStudentSlice.actions;
export default importStudentSlice.reducer;
