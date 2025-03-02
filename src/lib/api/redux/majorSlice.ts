import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

// Fetch danh sách ngành học (Major)
export const fetchMajors = createAsyncThunk(
  "majors/fetchMajors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/majors");
      return response.data.data; // Trả về danh sách major
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách ngành.");
    }
  }
);

type Major = {
  id: string;
  name: string;
};

type MajorState = {
  data: Major[];
  loading: boolean;
  error: string | null;
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
      })
      .addCase(fetchMajors.fulfilled, (state, action: PayloadAction<Major[]>) => {
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
