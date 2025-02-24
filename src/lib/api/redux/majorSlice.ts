import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../config/axios-client";

// Action fetch danh sách major
export const fetchMajors = createAsyncThunk(
  "majors/fetchMajors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/majors");
      return response.data.data; // Lấy danh sách major từ API
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

type MajorState = {
  data: any[]; // Thay bằng kiểu dữ liệu chính xác nếu bạn có type
  loading: boolean;
  error: string | null; // Sửa lỗi Type 'string' is not assignable to type 'null'
};

const initialState: MajorState = {
  data: [],
  loading: false,
  error: null,
};

const majorSlice = createSlice({
  name: "majors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMajors.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi khi bắt đầu request
      })
      .addCase(fetchMajors.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMajors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default majorSlice.reducer;
