import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { RootState } from "./store";

interface DecisionListTopic {
  id: string;
  decisionName: string;
  decisionTitle: string;
  decisionDate: string;
  decisionURL?: string;
  createdBy: string;
  createdAt: string;
  isDeleted: boolean;
  semesterId: string;
  type: string;
}

interface FormattedThesis {
  stt: number;
  mssv: string;
  studentName: string;
  groupCode: string;
  topicCode: string;
  topicNameEnglish: string;
  topicNameVietnamese: string;
  mentor: string;
  major: string;
  aiStatus?: string;
  confidence?: number;
  aiMessage?: string;
}

interface DecisionListTopicState {
  decisions: DecisionListTopic[];
  guidanceList: FormattedThesis[];
  loading: boolean;
  error: string | null;
}

const initialState: DecisionListTopicState = {
  decisions: [],
  guidanceList: [],
  loading: false,
  error: null,
};

// Lấy danh sách quyết định
export const fetchDecisionListTopic = createAsyncThunk(
  "decisionListTopic/fetchDecisionListTopic",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/thesis-assignments");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi lấy danh sách quyết định");
    }
  }
);

// Lấy quyết định theo ID
export const fetchDecisionListTopicById = createAsyncThunk(
  "decisionListTopic/fetchDecisionListTopicById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/thesis-assignments/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi lấy quyết định");
    }
  }
);

// Tạo quyết định mới
export const createDecisionListTopic = createAsyncThunk(
  "decisionListTopic/createDecisionListTopic",
  async (data: Omit<DecisionListTopic, "id" | "createdAt" | "isDeleted">, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/thesis-assignments", data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi tạo quyết định");
    }
  }
);

// Cập nhật quyết định
export const updateDecisionListTopic = createAsyncThunk(
  "decisionListTopic/updateDecisionListTopic",
  async ({ id, data }: { id: string; data: Partial<DecisionListTopic> }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/thesis-assignments/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi cập nhật quyết định");
    }
  }
);

// Xóa mềm quyết định
export const deleteDecisionListTopic = createAsyncThunk(
  "decisionListTopic/deleteDecisionListTopic",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/thesis-assignments/${id}/delete`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi xóa quyết định");
    }
  }
);

// Lấy danh sách hướng dẫn khóa luận
export const fetchGuidanceList = createAsyncThunk(
  "decisionListTopic/fetchGuidanceList",
  async (
    {
      semesterId,
      submissionPeriodId,
      includeAI,
    }: {
      semesterId?: string;
      submissionPeriodId?: string;
      includeAI?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get("/guidance-list", {
        params: { semesterId, submissionPeriodId, includeAI },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi lấy danh sách hướng dẫn");
    }
  }
);

const decisionListTopicSlice = createSlice({
  name: "decisionListTopic",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDecisionListTopic
      .addCase(fetchDecisionListTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDecisionListTopic.fulfilled, (state, action: PayloadAction<DecisionListTopic[]>) => {
        state.loading = false;
        state.decisions = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchDecisionListTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchDecisionListTopicById
    builder
      .addCase(fetchDecisionListTopicById.fulfilled, (state, action: PayloadAction<DecisionListTopic>) => {
        state.loading = false;
        if (!Array.isArray(state.decisions)) state.decisions = [];

        const index = state.decisions.findIndex((d) => d.id === action.payload.id);
        if (index >= 0) {
          state.decisions[index] = action.payload;
        } else {
          state.decisions.push(action.payload);
        }
      });

    // createDecisionListTopic
    builder.addCase(createDecisionListTopic.fulfilled, (state, action) => {
      state.loading = false;
      const semesterId = action.meta.arg.semesterId;

      if (!Array.isArray(state.decisions)) state.decisions = [];

      state.decisions.push({ ...action.payload, semesterId });
    });

    // updateDecisionListTopic
    builder.addCase(updateDecisionListTopic.fulfilled, (state, action: PayloadAction<DecisionListTopic>) => {
      state.loading = false;
      if (!Array.isArray(state.decisions)) state.decisions = [];

      const index = state.decisions.findIndex((d) => d.id === action.payload.id);
      if (index >= 0) {
        state.decisions[index] = action.payload;
      }
    });

    // deleteDecisionListTopic
    builder.addCase(deleteDecisionListTopic.fulfilled, (state, action: PayloadAction<DecisionListTopic>) => {
      state.loading = false;
      if (!Array.isArray(state.decisions)) state.decisions = [];

      state.decisions = state.decisions.filter((d) => d.id !== action.payload.id);
    });

    // fetchGuidanceList
    builder.addCase(fetchGuidanceList.fulfilled, (state, action: PayloadAction<FormattedThesis[]>) => {
      state.loading = false;
      state.guidanceList = action.payload;
    });
  },
});

export const { resetError } = decisionListTopicSlice.actions;
export default decisionListTopicSlice.reducer;

export const selectDecisionListTopic = (state: RootState) => state.decisionListTopic.decisions;
export const selectGuidanceList = (state: RootState) => state.decisionListTopic.guidanceList;
export const selectDecisionListTopicLoading = (state: RootState) => state.decisionListTopic.loading;
export const selectDecisionListTopicError = (state: RootState) => state.decisionListTopic.error;
