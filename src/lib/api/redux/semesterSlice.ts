import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Semester } from "../types";


export const fetchSemesters = createAsyncThunk(
  "semesters/fetchSemesters",
  async ({ yearId, page = 1, pageSize = 5}: { yearId: string; page: number; pageSize: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/semester/${yearId}/?page=${page}&pageSize=${pageSize}`);
      return {
        data: response.data.data.data,
        currentPage: response.data.data.currentPage,
        totalPages: response.data.data.totalPages,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch semesters");
    }
  }
);

export const createSemester = createAsyncThunk(
  "semesters/createSemester",
  async (newSemester: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/semester", newSemester);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create semester");
    }
  }
);


interface SemesterState {
  data: Semester[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: SemesterState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const semesterSlice = createSlice({
  name: "semesters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default semesterSlice.reducer;
