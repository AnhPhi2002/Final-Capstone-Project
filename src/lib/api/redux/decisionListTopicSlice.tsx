// src/features/decisionListTopic/decisionListTopicSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';


// Định nghĩa kiểu dữ liệu cho Decision
interface Decision {
  id: string;
  semesterId: string;
  decisionName: string;
  decisionTitle: string;
  decisionDate: string | null;
  createdBy: string;
  createdAt: string;
  isDeleted: boolean;
  type: string;
}

interface DecisionState {
  decisions: Decision[];
  loading: boolean;
  error: string | null;
  currentDecision: Decision | null;
}

// Trạng thái ban đầu
const initialState: DecisionState = {
  decisions: [],
  loading: false,
  error: null,
  currentDecision: null,
};

// Async Thunks
export const fetchAllDecisions = createAsyncThunk(
  'decisionList/fetchAllDecisions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/thesis-assignments');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách quyết định');
    }
  }
);

export const fetchDecisionById = createAsyncThunk(
  'decisionList/fetchDecisionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/thesis-assignments/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy thông tin quyết định');
    }
  }
);

export const createDecision = createAsyncThunk(
  'decisionList/createDecision',
  async (decisionData: Partial<Decision>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/thesis-assignments', decisionData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo quyết định');
    }
  }
);

export const updateDecision = createAsyncThunk(
  'decisionList/updateDecision',
  async ({ id, data }: { id: string; data: Partial<Decision> }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/thesis-assignments/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật quyết định');
    }
  }
);

export const deleteDecision = createAsyncThunk(
  'decisionList/deleteDecision',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/thesis-assignments/${id}/delete`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa quyết định');
    }
  }
);

// Slice
const decisionListTopicSlice = createSlice({
  name: 'decisionList',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDecision: (state) => {
      state.currentDecision = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all decisions
    builder
      .addCase(fetchAllDecisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDecisions.fulfilled, (state, action: PayloadAction<Decision[]>) => {
        state.loading = false;
        state.decisions = action.payload;
      })
      .addCase(fetchAllDecisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch decision by ID
    builder
      .addCase(fetchDecisionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDecisionById.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        state.currentDecision = action.payload;
      })
      .addCase(fetchDecisionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create decision
    builder
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
      });

    // Update decision
    builder
      .addCase(updateDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDecision.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        const index = state.decisions.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.decisions[index] = action.payload;
        }
        state.currentDecision = action.payload;
      })
      .addCase(updateDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete decision
    builder
      .addCase(deleteDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDecision.fulfilled, (state, action: PayloadAction<Decision>) => {
        state.loading = false;
        state.decisions = state.decisions.filter((d) => d.id !== action.payload.id);
        state.currentDecision = null;
      })
      .addCase(deleteDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, clearCurrentDecision } = decisionListTopicSlice.actions;

// Export reducer
export default decisionListTopicSlice.reducer;