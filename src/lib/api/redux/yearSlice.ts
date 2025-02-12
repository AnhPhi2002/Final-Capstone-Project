import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
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
      return response.data.data.data;
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

export const deleteYear = createAsyncThunk(
  "years/deleteYear",
  async (yearId: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/year/${yearId}`);
      return yearId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete year");
    }
  }
);

export const updateYear = createAsyncThunk(
  "years/updateYear",
  async ({ yearId, year }: { yearId: string; year: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/year/${yearId}`, { year });
      console.log("Response:", response.data);  // Debug response
      return response.data;
    } catch (error: any) {
      console.error("Update error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Cập nhật thất bại");
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
      .addCase(fetchAllYears.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createYear.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload); // Thêm mới vào đầu danh sách
      })
      .addCase(deleteYear.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((year) => year.id !== action.payload);
      })
      .addCase(updateYear.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((year) => year.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default yearSlice.reducer;
