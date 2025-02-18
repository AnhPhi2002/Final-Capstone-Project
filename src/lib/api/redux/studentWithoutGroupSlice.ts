import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { StudentNotGroup } from "@/lib/api/types/not-group-student";

type StudentWithoutGroupState = {
  students: StudentNotGroup[];
  loading: boolean;
  error: string | null;
};

const initialState: StudentWithoutGroupState = {
  students: [],
  loading: false,
  error: null,
};

// Định nghĩa kiểu cho response
interface ApiResponse {
  message: string;
  data: StudentNotGroup[];
}

export const fetchStudentsWithoutGroup = createAsyncThunk(
  "studentsWithoutGroup/fetch",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<ApiResponse>(
        `/groups/students-without-group/${semesterId}`
      );
      
      console.log("Full API Response:", response);
      console.log("API Response Data:", response.data);
      
      if (!response.data.data || !Array.isArray(response.data.data)) {
        console.error("Invalid response structure:", response.data);
        return rejectWithValue("Dữ liệu không hợp lệ");
      }
      
      // Log dữ liệu trả về chi tiết
      console.log("Student records count:", response.data.data.length);
      if (response.data.data.length > 0) {
        console.log("First student:", response.data.data[0]);
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error("API Error Details:", error.response || error);
      return rejectWithValue(error.response?.data?.message || "Lỗi tải danh sách sinh viên");
    }
  }
);

const studentsWithoutGroupSlice = createSlice({
  name: "studentsWithoutGroup",
  initialState,
  reducers: {
    // Reset state khi cần
    resetState: (state) => {
      state.students = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsWithoutGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsWithoutGroup.fulfilled, (state, action: PayloadAction<StudentNotGroup[]>) => {
        state.loading = false;
        state.students = action.payload;
        state.error = null;
        console.log("Students saved to Redux:", action.payload);
      })
      .addCase(fetchStudentsWithoutGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.students = [];
        console.error("Redux error:", action.payload);
      });
  },
});

// Export reducers
export const { resetState } = studentsWithoutGroupSlice.actions;
export default studentsWithoutGroupSlice.reducer;