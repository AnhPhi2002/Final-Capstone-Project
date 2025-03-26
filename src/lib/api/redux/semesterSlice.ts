import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Semester } from "../types";
import { RootState } from "./store";

// Fetch semesters by yearId (no pagination)
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

// Fetch semester detail
export const fetchSemesterDetail = createAsyncThunk(
  "semesters/fetchSemesterDetail",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/semester/detail/${semesterId}`);
      return response.data.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch semester detail");
    }
  }
);

// Create semester
export const createSemester = createAsyncThunk(
  "semesters/createSemester",
  async (newSemester: Partial<Semester>, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const existingSemesters = state.semesters.data;

    // Chuẩn hóa code về chữ thường để kiểm tra
    const normalizedCode = newSemester.code?.toLowerCase();

    // Kiểm tra trùng lặp code trong cùng yearId với các học kỳ chưa bị xóa
    if (
      existingSemesters.some(
        (semester) =>
          semester.yearId === newSemester.yearId &&
          semester.code.toLowerCase() === normalizedCode &&
          !semester.isDeleted
      )
    ) {
      return rejectWithValue("Mã học kỳ đã tồn tại trong năm học này (không phân biệt chữ hoa/thường)!");
    }

    // Kiểm tra trùng lặp ngày trong cùng yearId với các học kỳ chưa bị xóa
    const newStartDate = new Date(newSemester.startDate!);
    const newEndDate = new Date(newSemester.endDate!);
    const isDateOverlap = existingSemesters.some(
      (semester) =>
        semester.yearId === newSemester.yearId &&
        !semester.isDeleted &&
        (new Date(semester.startDate) <= newEndDate &&
          new Date(semester.endDate) >= newStartDate)
    );

    if (isDateOverlap) {
      return rejectWithValue("Khoảng thời gian của học kỳ mới giao nhau với một học kỳ hiện có trong năm học này!");
    }

    try {
      const response = await axiosClient.post("/semester", newSemester);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create semester");
    }
  }
);
// Update semester
export const updateSemester = createAsyncThunk(
  "semesters/updateSemester",
  async (
    { semesterId, updatedData }: { semesterId: string; updatedData: Partial<Semester> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/semester/${semesterId}`, updatedData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update semester");
    }
  }
);

// Soft delete semester
export const deleteSemester = createAsyncThunk(
  "semesters/deleteSemester",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/semester/${semesterId}/delete`);
      return response.data.data?.id || semesterId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể xóa học kỳ");
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
  reducers: {
    clearSemesters: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch semesters
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.loading = false;
        // Chỉ giữ những học kỳ chưa bị xóa (nếu muốn hiển thị cả thì bỏ filter)
        state.data = Array.isArray(action.payload)
          ? action.payload.filter((s) => !s.isDeleted)
          : [];
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch detail
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

      // Create
      .addCase(createSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSemester.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data.unshift(action.payload); // Optional: thêm vào đầu danh sách
        }
      })
      .addCase(createSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSemester.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSemester.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSemesters } = semesterSlice.actions;
export default semesterSlice.reducer;
