import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Semester } from "../types";

// Fetch a list of semesters by yearId
export const fetchSemesters = createAsyncThunk(
  "semesters/fetchSemesters",
  async (
    { yearId, page = 1, pageSize = 5 }: { yearId: string; page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(`/semester/${yearId}/?page=${page}&pageSize=${pageSize}`);
      return {
        data: response.data.data.data,
        currentPage: response.data.data.currentPage,
        totalPages: response.data.data.totalPages,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch semesters");
    }
  }
);

// Fetch semester detail by semesterId
export const fetchSemesterDetail = createAsyncThunk(
  "semesters/fetchSemesterDetail",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/semester/detail/${semesterId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch semester detail");
    }
  }
);

// Create a new semester
export const createSemester = createAsyncThunk(
  "semesters/createSemester",
  async (newSemester: Partial<Semester>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/semester", newSemester);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create semester");
    }
  }
);

// Update semester by semesterId
export const updateSemester = createAsyncThunk(
  "semesters/updateSemester",
  async (
    { semesterId, updatedData }: { semesterId: string; updatedData: Partial<Semester> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/semester/${semesterId}`, updatedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update semester");
    }
  }
);

// Delete semester by semesterId
export const deleteSemester = createAsyncThunk(
  "semesters/deleteSemester",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/semester/${semesterId}`);
      return semesterId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete semester");
    }
  }
);

interface SemesterState {
  data: Semester[];
  semesterDetail: Semester | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: SemesterState = {
  data: [],
  semesterDetail: null,
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
      // Fetch semesters list
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
      })

      // Fetch semester detail
      .addCase(fetchSemesterDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.semesterDetail = null;
      })
      .addCase(fetchSemesterDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.semesterDetail = action.payload;
      })
      .addCase(fetchSemesterDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create semester
      .addCase(createSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSemester.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update semester
      .addCase(updateSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSemester.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete semester
      .addCase(deleteSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSemester.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((semester) => semester.id !== action.payload);
      })
      .addCase(deleteSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default semesterSlice.reducer;
