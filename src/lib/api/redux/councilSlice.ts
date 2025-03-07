import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { Council } from "../types";

interface CouncilState {
  data: Council[];
  councilDetail: Council | null;
  loading: boolean;
  loadingDetail: boolean;
  error: string | null;
}

const initialState: CouncilState = {
  data: [],
  councilDetail: null,
  loading: false,
  loadingDetail: false,
  error: null,
};

// ✅ Fetch danh sách hội đồng theo submissionPeriodId
export const fetchCouncils = createAsyncThunk(
  "councils/fetchCouncils",
  async (submissionPeriodId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-topic`, {
        params: { submissionPeriodId },
      });
      return response.data.data as Council[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách hội đồng!");
    }
  }
);

// ✅ Fetch chi tiết hội đồng theo councilId
export const fetchCouncilDetail = createAsyncThunk(
  "council/fetchCouncilDetail",
  async (councilId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-topic/${councilId}`);
      return response.data.data as Council;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy thông tin hội đồng");
    }
  }
);

export const createCouncil = createAsyncThunk(
  "councils/createCouncil",
  async (newCouncil: Record<string, any>, { rejectWithValue }) => {
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
  async ({ councilId, updatedData }: { councilId: string; updatedData: Partial<Council> }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/council-topic/${councilId}`, updatedData);
      return response.data.data as Council;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật hội đồng!");
    }
  }
);

export const addCouncilMember = createAsyncThunk(
  "councils/addCouncilMember",
  async ({ councilId, email }: { councilId: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/council-topic/members?councilId=${councilId}`, {
        email,
        role: "reviewer", // Chỉ có 1 role
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể thêm thành viên vào hội đồng!");
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
        state.data.push(action.payload); // Thêm hội đồng mới vào danh sách
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
        state.councilDetail = action.payload;
        state.data = state.data.map((council) =>
          council.id === action.payload.id ? action.payload : council
        );
      })
      .addCase(updateCouncil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCouncils } = councilSlice.actions;
export default councilSlice.reducer;
