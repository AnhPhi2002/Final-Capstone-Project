import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Semester } from "../types";

interface SemesterState {
  semesters: Semester[];
  loading: boolean;
  error: string | null;
}

// Thunk để fetch danh sách semester theo yearId
export const fetchSemesters = createAsyncThunk(
  "semesters/fetchSemesters",
  async (yearId: string) => {
    let url = `/semester/?page=1&pageSize=100`; // Lấy tất cả semesters nếu chọn "All Years"
    if (yearId !== "all") {
      url = `/semester/${yearId}/?page=1&pageSize=5`;
    }

    const response = await axiosClient.get(url);

    return response.data.data.data.map((s: any) => ({
      id: s.id,
      code: s.code,
      yearId: s.yearId,
      startDate: s.startDate,
      endDate: s.endDate,
      registrationDeadline: s.registrationDeadline,
      status: s.status,
      createdAt: s.createdAt,
    }));
  }
);

const initialState: SemesterState = {
  semesters: [],
  loading: false,
  error: null,
};

const semesterSlice = createSlice({
  name: "semesters",
  initialState,
  reducers: {
    clearSemesters: (state) => {
      state.semesters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.semesters = action.payload;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch semesters";
      });
  },
});

export const { clearSemesters } = semesterSlice.actions;
export default semesterSlice.reducer;
