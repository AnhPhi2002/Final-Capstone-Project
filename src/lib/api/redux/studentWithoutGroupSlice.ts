import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import {
  StudentNotGroup,
  StudentNotGroupForStudent,
} from "@/lib/api/redux/types/not-group-student";

// Định nghĩa rõ ràng từng kiểu dữ liệu riêng biệt
type StudentWithoutGroupState = {
  students: StudentNotGroup[];
  studentsForStudent: StudentNotGroupForStudent[];
  loading: boolean;
  error: string | null;
};

const initialState: StudentWithoutGroupState = {
  students: [],
  studentsForStudent: [],
  loading: false,
  error: null,
};

// Định nghĩa kiểu cho response API chung
interface ApiResponse<T> {
  data: {
    success: boolean;
    status: number;
    message: string;
    data: T;
  };
}

// API fetchStudentsWithoutGroup (loại cũ)
export const fetchStudentsWithoutGroup = createAsyncThunk<
  StudentNotGroup[],
  string,
  { rejectValue: string }
>("studentsWithoutGroup/fetch", async (semesterId, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get<ApiResponse<StudentNotGroup[]>>(
      `/groups/students-without-group/${semesterId}`
    );

    if (!response.data.data.data || !Array.isArray(response.data.data.data)) {
      return rejectWithValue("Dữ liệu không hợp lệ");
    }

    return response.data.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Lỗi tải danh sách sinh viên"
    );
  }
});

// API fetchStudentsWithoutGroupForStudent (loại mới)
export const fetchStudentsWithoutGroupForStudent = createAsyncThunk<
  StudentNotGroupForStudent[],
  void,
  { rejectValue: string }
>("studentsWithoutGroupForStudent/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get<
      ApiResponse<StudentNotGroupForStudent[]>
    >(`/groups/students-without-group`);
    console.log("✅ API success response:", response.data); // kiểm tra success response

    if (!response.data.data || !Array.isArray(response.data.data)) {
      return rejectWithValue("Dữ liệu không hợp lệ");
    }

    return response.data.data;
  } catch (error: any) {
    // console.error("❌ API Error:", error.response || error.message);
    return rejectWithValue(
      
      error.response?.data?.message || "Lỗi tải danh sách sinh viên"
    );
  }
});

const studentsWithoutGroupSlice = createSlice({
  name: "studentsWithoutGroup",
  initialState,
  reducers: {
    resetState: (state) => {
      state.students = [];
      state.studentsForStudent = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý API fetchStudentsWithoutGroup (cũ)
      .addCase(fetchStudentsWithoutGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStudentsWithoutGroup.fulfilled,
        (state, action: PayloadAction<StudentNotGroup[]>) => {
          state.loading = false;
          state.students = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchStudentsWithoutGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi tải dữ liệu";
        state.students = [];
      })

      // Xử lý API fetchStudentsWithoutGroupForStudent (mới)
      .addCase(fetchStudentsWithoutGroupForStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStudentsWithoutGroupForStudent.fulfilled,
        (state, action: PayloadAction<StudentNotGroupForStudent[]>) => {
          state.studentsForStudent = action.payload;  // quan trọng nhất ở đây
          state.loading = false;
          state.error = null;
        }
      )   
      .addCase(fetchStudentsWithoutGroupForStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi tải dữ liệu";
        state.studentsForStudent = [];
      });
  },
});

// Export reducers
export const { resetState } = studentsWithoutGroupSlice.actions;
export default studentsWithoutGroupSlice.reducer;
