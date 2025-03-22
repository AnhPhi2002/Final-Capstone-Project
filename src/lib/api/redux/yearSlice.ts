import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Year } from "@/lib/api/redux/types/year";

// Thunk để lấy danh sách năm học
export const fetchYears = createAsyncThunk(
  "years/fetchYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/year`); 
      return response.data.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Không thể lấy danh sách năm học");
    }
  }
);

// Thunk để lấy toàn bộ danh sách năm học (không giới hạn hoặc logic khác)
export const fetchAllYears = createAsyncThunk(
  "years/fetchAllYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/year?all=true`); // Giả định có tham số all=true
      return response.data.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Không thể lấy tất cả năm học");
    }
  }
);

// Thunk để tạo năm học mới
export const createYear = createAsyncThunk(
  "years/createYear",
  async (newYear: { year: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/year", newYear);
      return response.data.data;  // Trả về dữ liệu năm học vừa tạo
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tạo năm học");
    }
  }
);

// Thunk để xóa (mềm) năm học
export const deleteYear = createAsyncThunk(
  "years/deleteYear",
  async (yearId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/year/${yearId}/delete`);
      return response.data.data?.id || yearId; // Ưu tiên lấy id từ server nếu có
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể xóa năm học"
      );
    }
  }
);


// Thunk để cập nhật năm học
export const updateYear = createAsyncThunk(
  "years/updateYear",
  async ({ yearId, year }: { yearId: string; year: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/year/${yearId}`, { year });
      return response.data.data;  // Trả về dữ liệu năm học đã cập nhật
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật năm học");
    }
  }
);

interface YearState {
  data: Year[];
  loading: boolean;
  error: string | null;
}

const initialState: YearState = {
  data: [],
  loading: false,
  error: null,
};

const yearSlice = createSlice({
  name: "years",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchYears
      .addCase(fetchYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý fetchAllYears
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

      // Xử lý createYear
      .addCase(createYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createYear.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.unshift(action.payload);  // Thêm năm học mới vào đầu danh sách
          state.loading = false;
          state.error = null;
        }
      })
      .addCase(createYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý deleteYear
      .addCase(deleteYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteYear.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((year) => year.id !== action.payload);
      })
      .addCase(deleteYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý updateYear
      .addCase(updateYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateYear.fulfilled, (state, action) => {
        const index = state.data.findIndex((year) => year.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;  // Cập nhật thông tin năm học
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default yearSlice.reducer;
