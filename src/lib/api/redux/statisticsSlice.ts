// store/statisticsSlice.ts
import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { axiosClient } from '@/lib/api/config/axios-client';

interface StatisticItem {
  status?: string;
  round?: string;
  total: number;
}

interface StatisticsState {
  studentQualification: StatisticItem[];
  groupStatus: StatisticItem[];
  topicStatus: StatisticItem[];
  reviewRounds: StatisticItem[];
  defenseRounds: StatisticItem[];
  studentGroupStatus: StatisticItem[];
  groupTopicStatus: StatisticItem[];
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  studentQualification: [],
  groupStatus: [],
  topicStatus: [],
  reviewRounds: [],
  defenseRounds: [],
  studentGroupStatus: [],
  groupTopicStatus: [],
  loading: false,
  error: null,
};

// ================== ASYNC THUNKS ==================

export const fetchStudentQualification = createAsyncThunk(
  'statistics/fetchStudentQualification',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/student-qualification-status', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

export const fetchGroupStatus = createAsyncThunk(
  'statistics/fetchGroupStatus',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/group-statuses', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

export const fetchTopicStatus = createAsyncThunk(
  'statistics/fetchTopicStatus',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/topic-statuses', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

export const fetchReviewRounds = createAsyncThunk(
  'statistics/fetchReviewRounds',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/review-rounds', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

export const fetchDefenseRounds = createAsyncThunk(
  'statistics/fetchDefenseRounds',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/defense-rounds', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

export const fetchStudentGroupStatus = createAsyncThunk(
  'statistics/fetchStudentGroupStatus',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/student-group-status', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

export const fetchGroupTopicStatus = createAsyncThunk(
  'statistics/fetchGroupTopicStatus',
  async (semesterId: string) => {
    const res = await axiosClient.get('/api/statistics/group-topic-status', {
      params: { semesterId },
    });
    return res.data as StatisticItem[];
  }
);

// ================== SLICE ==================

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearStatistics(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentQualification.fulfilled, (state, action) => {
        state.studentQualification = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroupStatus.fulfilled, (state, action) => {
        state.groupStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopicStatus.fulfilled, (state, action) => {
        state.topicStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewRounds.fulfilled, (state, action) => {
        state.reviewRounds = action.payload;
        state.loading = false;
      })
      .addCase(fetchDefenseRounds.fulfilled, (state, action) => {
        state.defenseRounds = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentGroupStatus.fulfilled, (state, action) => {
        state.studentGroupStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroupTopicStatus.fulfilled, (state, action) => {
        state.groupTopicStatus = action.payload;
        state.loading = false;
      })
      .addMatcher(
        (action: AnyAction) => action.type.startsWith('statistics/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.startsWith('statistics/') && action.type.endsWith('/rejected'),
        (state, action: { error: { message?: string } }) => {
          state.loading = false;
          state.error = action.error?.message ?? 'Something went wrong';
        }
      );
  },
});

// ================== EXPORTS ==================
export const { clearStatistics } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;
