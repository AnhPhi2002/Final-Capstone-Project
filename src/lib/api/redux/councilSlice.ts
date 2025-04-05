import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { Council, CouncilMember, CouncilDetail } from "../types";

interface CouncilState {
  dataLecturer: Council[];
  data: CouncilDetail[];
  councilDetail: CouncilDetail | null;
  loading: boolean;
  loadingDetail: boolean;
  error: string | null;
}

const initialState: CouncilState = {
  dataLecturer: [],
  data: [],
  councilDetail: null,
  loading: false,
  loadingDetail: false,
  error: null,
};

export const fetchCouncils = createAsyncThunk(
  "councils/fetchCouncils",
  async ({ semesterId, submissionPeriodId }: { semesterId: string, submissionPeriodId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-topic`, {
        params: { semesterId, submissionPeriodId },
      });
      return response.data.data as CouncilDetail[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách hội đồng!");
    }
  }
);

export const fetchCouncilsForLecturer = createAsyncThunk(
  "councils/fetchCouncilsForLecturer",
  async ({ semesterId, submissionPeriodId }: { semesterId: string, submissionPeriodId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-topic`, {
        params: { semesterId, submissionPeriodId },
      });
      return response.data.data as Council[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách hội đồng!");
    }
  }
);

export const fetchCouncilDetail = createAsyncThunk(
  "council/fetchCouncilDetail",
  async (councilId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-topic/${councilId}`);
      return response.data.data as CouncilDetail;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy thông tin hội đồng");
    }
  }
);

export const createCouncil = createAsyncThunk(
  "councils/createCouncil",
  async (newCouncil: Partial<Council>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/council-topic`, newCouncil);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tạo hội đồng!");
    }
  }
);

export const updateCouncil = createAsyncThunk(
  "councils/updateCouncil",
  async (
    { councilId, updatedData }: { councilId: string; updatedData: Partial<Council> },
    { rejectWithValue }
  ) => {
    try {
      console.log("Updating council with data:", updatedData);
      const response = await axiosClient.put(`/council-topic/${councilId}`, updatedData);
      console.log("API response:", response.data);
      return response.data.data as CouncilDetail;
    } catch (error: any) {
      console.error("Update council error:", error);
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật hội đồng!");
    }
  }
);

// export const deleteCouncil = createAsyncThunk(
//   "councils/deleteCouncil",
//   async (councilId: string, { rejectWithValue }) => {
//     try {
//       await axiosClient.delete(`/council-topic/${councilId}`);
//       return councilId;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Không thể xóa hội đồng!");
//     }
//   }
// );

export const addCouncilMember = createAsyncThunk(
  "councils/addCouncilMember",
  async (
    { councilId, email }: { councilId: string; email: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        `/council-topic/members/${councilId}`,
        { email, role: "council_member" }
      );
      return response.data.data as CouncilMember;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể thêm thành viên vào hội đồng!");
    }
  }
);
// Xóa hội đồng
export const deleteCouncil = createAsyncThunk(
  "councils/deleteCouncil",
  async (councilId: string, { rejectWithValue }) => {
    console.log("🔴 Xóa hội đồng ID:", councilId); // Debug
    try {
      const response = await axiosClient.delete(`/council-topic/${councilId}`);
      console.log("✅ API Response:", response); // Debug response
      return councilId;
    } catch (error: any) {
      console.error("❌ Lỗi xóa hội đồng:", error.response?.data || error.message);

      // Nếu API trả về 404 nhưng hội đồng đã bị xóa, vẫn cập nhật Redux
      if (error.response?.status === 404) {
        return councilId; // Trả về ID để Redux cập nhật state
      }

      return rejectWithValue(error.response?.data?.message || "Không thể xóa hội đồng!");
    }
  }
);

// Xóa thành viên khỏi hội đồng

export const deleteCouncilMember = createAsyncThunk(
  "councils/deleteCouncilMember",
  async ({ councilId, userId }: { councilId: string; userId: string }, { rejectWithValue }) => {
    try {
      console.log(`🔴 Deleting member ${userId} from council ${councilId}`);

      // Sửa lại đường dẫn đúng
      const response = await axiosClient.delete(`/council-topic/council/${councilId}/user/${userId}`);

      console.log("✅ API Response:", response);
      return { councilId, userId };
    } catch (error: any) {
      console.error("❌ Delete council member error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Không thể xóa thành viên khỏi hội đồng!");
    }
  }
);

export const fetchCouncilDetailForLecturer = createAsyncThunk(
  "councils/fetchCouncilDetailForLecturer",
  async ({ councilId, semesterId }: { councilId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-topic/lecturers/councils/${councilId}`, {
        params: { semesterId }
      });
      const council = response.data.data as Council;
      if (council.isDeleted) {
        return rejectWithValue("Hội đồng đã bị xóa!");
      }
      return council;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết hội đồng!");
    }
  }
);

const councilSlice = createSlice({
  name: "councils",
  initialState,
  reducers: {
    clearCouncils: (state) => {
      state.data = [];
      state.councilDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouncils.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouncils.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCouncils.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCouncilsForLecturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouncilsForLecturer.fulfilled, (state, action) => {
        state.loading = false;
        state.dataLecturer = action.payload;
      })
      .addCase(fetchCouncilsForLecturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCouncilDetail.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchCouncilDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.councilDetail = action.payload;
      })
      .addCase(fetchCouncilDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(createCouncil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCouncil.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createCouncil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCouncil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCouncil.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCouncilDetail = action.payload; // kiểu CouncilDetail

        // Cập nhật danh sách hội đồng
        state.data = state.data.map((councilDetail) =>
          councilDetail.council.id === updatedCouncilDetail.council.id
            ? updatedCouncilDetail
            : councilDetail
        );

        // Cập nhật chi tiết nếu đang xem đúng hội đồng đó
        if (state.councilDetail?.council.id === updatedCouncilDetail.council.id) {
          state.councilDetail = updatedCouncilDetail; // ✅ gán đúng kiểu
        }
      })

      .addCase(updateCouncil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCouncil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCouncil.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((council) => council.council.id !== action.payload);

        // Nếu đang xem trang chi tiết hội đồng, xóa nó để tránh gọi lại API GET
        if (state.councilDetail?.council.id === action.payload) {
          state.councilDetail = null;
        }
      })
      .addCase(deleteCouncil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCouncilMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCouncilMember.fulfilled, (state, action) => {
        state.loading = false;
        if (state.councilDetail) {
          state.councilDetail.council.members.push(action.payload);
        }
      })
      .addCase(addCouncilMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCouncilMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCouncilMember.fulfilled, (state, action) => {
        state.loading = false;
        const { councilId, userId } = action.payload;

        // Nếu đang xem chi tiết hội đồng, cập nhật danh sách thành viên
        if (state.councilDetail?.council.id === councilId) {
          state.councilDetail.council.members = state.councilDetail.council.members.filter(
            (member) => member.userId !== userId
          );
        }
      })
      .addCase(deleteCouncilMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCouncilDetailForLecturer.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      // Trong extraReducers, sửa case fetchCouncilDetailForlecturer.fulfilled
      .addCase(fetchCouncilDetailForLecturer.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.councilDetail = {
          council: action.payload, // Gán dữ liệu Council từ API
          schedules: [], // Gán mặc định schedules là mảng rỗng vì API không trả về
        };
      })
      .addCase(fetchCouncilDetailForLecturer.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      ;

  },
});

export const { clearCouncils } = councilSlice.actions;
export default councilSlice.reducer;
