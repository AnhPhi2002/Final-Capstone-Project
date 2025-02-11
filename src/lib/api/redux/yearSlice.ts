import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface Year {
  id: string;
  year: string;
}

interface YearState {
  years: Year[];
  loading: boolean;
  error: string | null;
}

// Thunk để fetch danh sách năm học từ API
export const fetchYears = createAsyncThunk("years/fetchYears", async () => {
  const response = await axiosClient.get("/year/?page=1&pageSize=5");
  return response.data.data.data; // Giả sử API trả về { data: [...] }
});

const initialState: YearState = {
  years: [],
  loading: false,
  error: null,
};

const yearSlice = createSlice({
  name: "years",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYears.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.loading = false;
        state.years = action.payload;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch years";
      });
  },
});

export default yearSlice.reducer;
