import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { Council, CouncilMember } from "../types";

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
      return response.data.data as Council;
    } catch (error: any) {
      console.error("Update council error:", error);
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật hội đồng!");
    }
  }
);

export const deleteCouncil = createAsyncThunk(
  "councils/deleteCouncil",
  async (councilId: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/council-topic/${councilId}`);
      return councilId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể xóa hội đồng!");
    }
  }
);

export const addCouncilMember = createAsyncThunk(
  "councils/addCouncilMember",
  async (
    { councilId, email, semesterId }: { councilId: string; email: string; semesterId:string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        `/council-topic/members`,
        { email, role: "council_member"},{params: {semesterId, councilId}}
      );
      return response.data.data as CouncilMember;
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
        console.log("CouncilDetail updated with:", action.payload); // Debug
        if (!state.councilDetail || JSON.stringify(state.councilDetail) !== JSON.stringify(action.payload)) {
          state.councilDetail = action.payload;
        }
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
        const updatedCouncil = action.payload;
        console.log("Council updated with:", updatedCouncil); // Debug
        state.data = state.data.map((council) =>
          council.id === updatedCouncil.id ? updatedCouncil : council
        );
        if (state.councilDetail?.id === updatedCouncil.id) {
          if (JSON.stringify(state.councilDetail) !== JSON.stringify(updatedCouncil)) {
            state.councilDetail = updatedCouncil;
          }
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
        state.data = state.data.filter((council) => council.id !== action.payload);
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
          state.councilDetail.members.push(action.payload);
        }
      })
      .addCase(addCouncilMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCouncils } = councilSlice.actions;
export default councilSlice.reducer;