import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

export const importConditions = createAsyncThunk<
  any,
  { formData: FormData },
  { rejectValue: string }
>("importConditions/import", async ({ formData }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosClient.post("/import/import-conditions", formData, {
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

export const importConditionsBlock3 = createAsyncThunk<
  any,
  { formData: FormData },
  { rejectValue: string }
>(
  "importConditionsBlock3/import",
  async ({ formData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axiosClient.post("/import-block3", formData, {
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

const importConditionsSlice = createSlice({
  name: "importConditions",
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
      .addCase(importConditions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importConditions.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(importConditions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra!";
      })
      .addCase(importConditionsBlock3.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importConditionsBlock3.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(importConditionsBlock3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra!";
      })
      ;
  },
});

export const { resetState } = importConditionsSlice.actions;
export default importConditionsSlice.reducer;
