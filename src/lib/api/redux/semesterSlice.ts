import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Semester } from "../types";

// Fetch a list of semesters by yearId (không có phân trang)
export const fetchSemesters = createAsyncThunk(
  "semesters/fetchSemesters",
  async ({ yearId }: { yearId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/semester/${yearId}`);
      return response.data.data.data;
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
}

const initialState: SemesterState = {
  data: [],
  semesterDetail: null,
  loading: false,
  error: null,
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
        state.data = action.payload;
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
