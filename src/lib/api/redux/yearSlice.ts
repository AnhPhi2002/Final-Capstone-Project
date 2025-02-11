import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client"; // Đường dẫn tới file axios-client.ts

import { Year } from "@/lib/api/types/year";


export const fetchYears = createAsyncThunk(
  "years/fetchYears",
  async ({ page = 1, pageSize = 6 }: { page: number; pageSize: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/year/?page=${page}&pageSize=${pageSize}`);
      return {
        data: response.data.data.data,
        currentPage: response.data.data.currentPage,
        totalPages: response.data.data.totalPages,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch years");
    }
  }
);

export const fetchAllYears = createAsyncThunk(
  "years/fetchAllYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/year`);
      return response.data.data.data; // Trả về tất cả dữ liệu year
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch all years");
    }
  }
);


export const createYear = createAsyncThunk(
  "years/createYear",
  async (newYear: { year: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/year", newYear);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create year");
    }
  }
);

interface YearState {
  data: Year[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: YearState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const yearSlice = createSlice({
  name: "years",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchAllYears.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : []; // Chuyển thành mảng nếu không phải
      })
      .addCase(fetchAllYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createYear.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default yearSlice.reducer;
