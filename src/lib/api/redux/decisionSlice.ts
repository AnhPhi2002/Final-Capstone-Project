import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '@/lib/api/config/axios-client';
import { RootState } from './store';

export interface Decision {
  id: string;
  decisionName?: string;
  decisionTitle?: string;
  decisionDate?: string;
  proposal?: string;
  content?: string;
  draftFile?: string | null;
  finalFile?: string | null;
  decisionURL?: string | null;
  semesterId: string;
  createdBy?: string;
  createdAt?: string;
  isDeleted?: boolean;
  signature?: string | null;
  type?: 'DRAFT' | 'FINAL';
  basedOn?: string[];
  participants?: string;
  clauses?: string[];
}

export interface CreateDecisionPayload {
  decisionName?: string;
  decisionTitle?: string;
  decisionDate?: string;
  type?: 'DRAFT' | 'FINAL';
  basedOn?: string[];
  content?: string;
  clauses?: string[];
  proposal?: string;
  signature?: string;
  semesterId?: string;
  draftFile?: string | null;
  finalFile?: string | null;
  decisionURL?: string | null;
  createdBy?: string;
  createdAt?: string;
  isDeleted?: boolean;
  participants?: string;
}

interface DecisionState {
  decisions: Decision[];
  selectedDecision: Decision | null;
  loading: boolean;
  error: string | null;
  lastFetchedSemesterId: string | null; // Lưu semesterId đã fetch
}

const initialState: DecisionState = {
  decisions: [],
  selectedDecision: null,
  loading: false,
  error: null,
  lastFetchedSemesterId: null,
};

export const fetchAllDecisions = createAsyncThunk(
  'decision/fetchAllDecisions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get('/decisions');
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Không thể lấy danh sách quyết định');
    }
  }
);

export const fetchDecisionsBySemesterId = createAsyncThunk(
  'decision/fetchDecisionsBySemesterId',
  async (semesterId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    // Kiểm tra nếu đã fetch cho semesterId này và dữ liệu còn hợp lệ
    if (
      state.decision.lastFetchedSemesterId === semesterId &&
      state.decision.decisions.length > 0 &&
      !state.decision.error
    ) {
      return state.decision.decisions; // Trả về dữ liệu đã có
    }

    try {
      const res = await axiosClient.get('/decisions');
      const filteredDecisions = res.data.data.filter(
        (decision: Decision) => decision.semesterId === semesterId && !decision.isDeleted
      );
      if (filteredDecisions.length === 0) {
        throw new Error('Không tìm thấy quyết định cho học kỳ này');
      }
      return filteredDecisions;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Không thể lấy danh sách quyết định');
    }
  }
);

export const fetchDecisionById = createAsyncThunk(
  'decision/fetchDecisionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/decisions/${id}`);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Không thể lấy quyết định');
    }
  }
);

export const createDecision = createAsyncThunk(
  'decision/createDecision',
  async (data: CreateDecisionPayload, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post('/decisions', data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Tạo quyết định thất bại');
    }
  }
);

export const updateDecision = createAsyncThunk(
  'decision/updateDecision',
  async ({ id, data }: { id: string; data: Partial<Decision> }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/decisions/${id}`, data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Cập nhật quyết định thất bại');
    }
  }
);

export const deleteDecision = createAsyncThunk(
  'decision/deleteDecision',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/decisions/${id}/delete`);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Xoá quyết định thất bại');
    }
  }
);

const decisionSlice = createSlice({
  name: 'decision',
  initialState,
  reducers: {
    resetSelectedDecision(state) {
      state.selectedDecision = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDecisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDecisions.fulfilled, (state, action) => {
        state.loading = false;
        state.decisions = action.payload;
      })
      .addCase(fetchAllDecisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDecisionsBySemesterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDecisionsBySemesterId.fulfilled, (state, action) => {
        state.loading = false;
        state.decisions = action.payload;
        state.lastFetchedSemesterId = action.meta.arg; // Lưu semesterId đã fetch
      })
      .addCase(fetchDecisionsBySemesterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDecisionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDecisionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDecision = action.payload;
      })
      .addCase(fetchDecisionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDecision.fulfilled, (state, action) => {
        state.loading = false;
        state.decisions.unshift(action.payload);
      })
      .addCase(createDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDecision.fulfilled, (state, action) => {
        state.loading = false;
        state.decisions = state.decisions.map((d) =>
          d.id === action.payload.id ? action.payload : d
        );
        if (state.selectedDecision?.id === action.payload.id) {
          state.selectedDecision = action.payload;
        }
      })
      .addCase(updateDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDecision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDecision.fulfilled, (state, action) => {
        state.loading = false;
        state.decisions = state.decisions.filter((d) => d.id !== action.payload.id);
        if (state.selectedDecision?.id === action.payload.id) {
          state.selectedDecision = null;
        }
      })
      .addCase(deleteDecision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSelectedDecision } = decisionSlice.actions;
export default decisionSlice.reducer;