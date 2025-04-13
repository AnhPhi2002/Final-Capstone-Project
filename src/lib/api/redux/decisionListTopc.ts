import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from "../config/axios-client";

interface Decision {
  id: string;
  decisionName: string;
  decisionTitle: string;
  decisionDate: string | null;
  createdBy: string;
  createdAt: string;
  isDeleted: boolean;
  type: string;
  semesterId?: string;
  decisionURL?: string; // Added decisionURL property
}

interface ThesisAssignment {
  id: string;
  thesisTitle: string;
  studentName: string;
  supervisor: string;
  // Add other fields based on /thesis-assignments/:decisionId response
}

interface DecisionState {
  decisions: Decision[];
  thesisAssignments: ThesisAssignment[];
  loading: boolean;
  error: string | null;
}

const initialState: DecisionState = {
  decisions: [],
  thesisAssignments: [],
  loading: false,
  error: null,
};

// Lấy danh sách quyết định theo semesterId
export const fetchDecisions = createAsyncThunk(
  'decisionListTop/fetchDecisions',
  async ({ semesterId }: { semesterId?: string }, { rejectWithValue }) => {
    try {
      const url = semesterId ? `/decisions?semesterId=${semesterId}` : '/decisions';
      const response = await axiosClient.get(url);
      console.log("Phản hồi API decisions:", response.data);
      return response.data.data || [];
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách quyết định:", error);
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi lấy danh sách quyết định'
      );
    }
  }
);

// Lấy danh sách phân công luận văn theo decisionId
export const fetchThesisAssignments = createAsyncThunk(
  "decisionListTop/fetchThesisAssignments",
  async (decisionId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/thesis-assignments/${decisionId}`);
      console.log("Phản hồi API thesis-assignments:", response.data);
      return response.data.data || [];
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách phân công:", error);
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách phân công"
      );
    }
  }
);

// Lấy quyết định theo ID
export const fetchDecisionById = createAsyncThunk(
  'decisionListTop/fetchDecisionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/decisions/${id}`);
      console.log("Phản hồi API decision by ID:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy quyết định theo ID:", error);
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi lấy quyết định'
      );
    }
  }
);

// Tạo quyết định mới
export const createDecision = createAsyncThunk(
  'decisionListTop/createDecision',
  async (
    data: { decisionName: string; decisionTitle: string; decisionDate?: string; type: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post('/decisions', data);
      console.log("Phản hồi API create decision:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo quyết định:", error);
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi tạo quyết định'
      );
    }
  }
);

// Cập nhật quyết định
export const updateDecision = createAsyncThunk(
  'decisionListTop/updateDecision',
  async (
    { id, data }: { id: string; data: { decisionName?: string; decisionTitle?: string; decisionDate?: string; type?: string; semesterId?: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/decisions/${id}`, data);
      console.log("Phản hồi API update decision:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Lỗi khi cập nhật quyết định:", error);
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi cập nhật quyết định'
      );
    }
  }
);

// Xóa mềm quyết định
export const deleteDecision = createAsyncThunk(
  'decisionListTop/deleteDecision',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/decisions/${id}/delete`);
      console.log("Phản hồi API delete decision:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Lỗi khi xóa quyết định:", error);
      return rejectWithValue(
        error.response?.data?.message || 'Lỗi khi xóa quyết định'
      );
    }
  }
);

const decisionListTopSlice = createSlice({
  name: 'decisionListTop',
  initialState,
  reducers: {
    clearDecisions: (state) => {
      state.decisions = [];
      state.thesisAssignments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchDecisions
      .addCase(fetchDecisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDecisions.fulfilled, (state, action: PayloadAction<Decision[]>) => {
        state.loading = false;
        state.decisions = action.payload;
      })
      .addCase(fetchDecisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý fetchThesisAssignments
      .addCase(fetchThesisAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThesisAssignments.fulfilled, (state, action: PayloadAction<ThesisAssignment[]>) => {
        state.loading = false;
        state.thesisAssignments = action.payload;
      })
      .addCase(fetchThesisAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý fetchDecisionById
      .addCase(fetchDecisionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDecisionById.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        const index = state.decisions.findIndex((d) => d.id === action.payload.id);
        if (index >= 0) {
          state.decisions[index] = action.payload;
        } else {
          state.decisions.push(action.payload);
        }
      })
      .addCase(fetchDecisionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý createDecision
      .addCase(createDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDecision.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        state.decisions.push(action.payload);
      })
      .addCase(createDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý updateDecision
      .addCase(updateDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDecision.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        const index = state.decisions.findIndex((d) => d.id === action.payload.id);
        if (index >= 0) {
          state.decisions[index] = action.payload;
        }
      })
      .addCase(updateDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Xử lý deleteDecision
      .addCase(deleteDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDecision.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        state.decisions = state.decisions.filter((d) => d.id !== action.payload.id);
      })
      .addCase(deleteDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDecisions } = decisionListTopSlice.actions;
export default decisionListTopSlice.reducer;