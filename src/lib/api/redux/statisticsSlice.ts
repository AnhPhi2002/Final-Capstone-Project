// src/lib/api/redux/statisticsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { axiosClient } from "../config/axios-client";
import {
  StudentQualificationStatus,
  GroupStatus,
  TopicStatus,
  ReviewRound,
  DefenseRound,
  StudentGroupStatus,
  GroupTopicStatus,
  DefenseResultSummary,
  DefenseResultByRound,
  GroupCreationType,
} from "./types/staticDashboard";

interface StatisticsState {
  studentQualification: { data: StudentQualificationStatus[]; total?: number; loading: boolean; error: string | null };
  groupStatus: { data: GroupStatus[]; total?: number; loading: boolean; error: string | null };
  topicStatus: { data: TopicStatus[]; loading: boolean; error: string | null };
  reviewRounds: { data: ReviewRound[]; total?: number; loading: boolean; error: string | null };
  defenseRounds: { data: DefenseRound[]; total?: number; loading: boolean; error: string | null };
  studentGroupStatus: { data: StudentGroupStatus[]; total?: number; loading: boolean; error: string | null };
  groupTopicStatus: { data: GroupTopicStatus[]; loading: boolean; error: string | null };
  defenseResultSummary: { data: DefenseResultSummary[]; loading: boolean; error: string | null };
  defenseResultByRound: { data: DefenseResultByRound[]; loading: boolean; error: string | null };
  groupCreationType: { data: GroupCreationType | null; loading: boolean; error: string | null };
}

const initialState: StatisticsState = {
  studentQualification: { data: [], loading: false, error: null },
  groupStatus: { data: [], loading: false, error: null },
  topicStatus: { data: [], loading: false, error: null },
  reviewRounds: { data: [], loading: false, error: null },
  defenseRounds: { data: [], loading: false, error: null },
  studentGroupStatus: { data: [], loading: false, error: null },
  groupTopicStatus: { data: [], loading: false, error: null },
  defenseResultSummary: { data: [], loading: false, error: null },
  defenseResultByRound: { data: [], loading: false, error: null },
  groupCreationType: { data: null, loading: false, error: null },
};

// Async thunks
export const fetchStudentQualification = createAsyncThunk(
  "statistics/fetchStudentQualification",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/student-qualification-status`, {
      params: { semesterId },
    });
    return response.data as { total: number; data: StudentQualificationStatus[] };
  }
);

export const fetchGroupStatus = createAsyncThunk(
  "statistics/fetchGroupStatus",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/group-statuses`, {
      params: { semesterId },
    });
    return response.data as { total: number; data: GroupStatus[] };
  }
);

export const fetchTopicStatus = createAsyncThunk(
  "statistics/fetchTopicStatus",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/topic-statuses`, {
      params: { semesterId },
    });
    return response.data as TopicStatus[];
  }
);

export const fetchReviewRounds = createAsyncThunk(
  "statistics/fetchReviewRounds",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/review-rounds`, {
      params: { semesterId },
    });
    return response.data as { total: number; data: ReviewRound[] };
  }
);

export const fetchDefenseRounds = createAsyncThunk(
  "statistics/fetchDefenseRounds",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/defense-rounds`, {
      params: { semesterId },
    });
    return response.data as { total: number; data: DefenseRound[] };
  }
);

export const fetchStudentGroupStatus = createAsyncThunk(
  "statistics/fetchStudentGroupStatus",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/student-group-status`, {
      params: { semesterId },
    });
    return response.data as { total: number; data: StudentGroupStatus[] };
  }
);

export const fetchGroupTopicStatus = createAsyncThunk(
  "statistics/fetchGroupTopicStatus",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/group-topic-status`, {
      params: { semesterId },
    });
    return response.data as GroupTopicStatus[];
  }
);

export const fetchDefenseResultSummary = createAsyncThunk(
  "statistics/fetchDefenseResultSummary",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/defense-result-summary`, {
      params: { semesterId },
    });
    return response.data as DefenseResultSummary[];
  }
);

export const fetchDefenseResultByRound = createAsyncThunk(
  "statistics/fetchDefenseResultByRound",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/defense-result-by-round`, {
      params: { semesterId },
    });
    return response.data as DefenseResultByRound[];
  }
);

export const fetchGroupCreationType = createAsyncThunk(
  "statistics/fetchGroupCreationType",
  async (semesterId: string) => {
    const response = await axiosClient.get(`/statistics/group-creation-type`, {
      params: { semesterId },
    });
    return response.data as GroupCreationType;
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Student Qualification
    builder
      .addCase(fetchStudentQualification.pending, (state) => {
        state.studentQualification.loading = true;
        state.studentQualification.error = null;
      })
      .addCase(fetchStudentQualification.fulfilled, (state, action) => {
        state.studentQualification.loading = false;
        state.studentQualification.data = action.payload.data;
        state.studentQualification.total = action.payload.total;
      })
      .addCase(fetchStudentQualification.rejected, (state, action) => {
        state.studentQualification.loading = false;
        state.studentQualification.error = action.error.message || "Failed to fetch";
      });

    // Group Status
    builder
      .addCase(fetchGroupStatus.pending, (state) => {
        state.groupStatus.loading = true;
        state.groupStatus.error = null;
      })
      .addCase(fetchGroupStatus.fulfilled, (state, action) => {
        state.groupStatus.loading = false;
        state.groupStatus.data = action.payload.data;
        state.groupStatus.total = action.payload.total;
      })
      .addCase(fetchGroupStatus.rejected, (state, action) => {
        state.groupStatus.loading = false;
        state.groupStatus.error = action.error.message || "Failed to fetch";
      });

    // Topic Status
    builder
      .addCase(fetchTopicStatus.pending, (state) => {
        state.topicStatus.loading = true;
        state.topicStatus.error = null;
      })
      .addCase(fetchTopicStatus.fulfilled, (state, action) => {
        state.topicStatus.loading = false;
        state.topicStatus.data = action.payload;
      })
      .addCase(fetchTopicStatus.rejected, (state, action) => {
        state.topicStatus.loading = false;
        state.topicStatus.error = action.error.message || "Failed to fetch";
      });

    // Review Rounds
    builder
      .addCase(fetchReviewRounds.pending, (state) => {
        state.reviewRounds.loading = true;
        state.reviewRounds.error = null;
      })
      .addCase(fetchReviewRounds.fulfilled, (state, action) => {
        state.reviewRounds.loading = false;
        state.reviewRounds.data = action.payload.data;
        state.reviewRounds.total = action.payload.total;
      })
      .addCase(fetchReviewRounds.rejected, (state, action) => {
        state.reviewRounds.loading = false;
        state.reviewRounds.error = action.error.message || "Failed to fetch";
      });

    // Defense Rounds
    builder
      .addCase(fetchDefenseRounds.pending, (state) => {
        state.defenseRounds.loading = true;
        state.defenseRounds.error = null;
      })
      .addCase(fetchDefenseRounds.fulfilled, (state, action) => {
        state.defenseRounds.loading = false;
        state.defenseRounds.data = action.payload.data;
        state.defenseRounds.total = action.payload.total;
      })
      .addCase(fetchDefenseRounds.rejected, (state, action) => {
        state.defenseRounds.loading = false;
        state.defenseRounds.error = action.error.message || "Failed to fetch";
      });

    // Student Group Status
    builder
      .addCase(fetchStudentGroupStatus.pending, (state) => {
        state.studentGroupStatus.loading = true;
        state.studentGroupStatus.error = null;
      })
      .addCase(fetchStudentGroupStatus.fulfilled, (state, action) => {
        state.studentGroupStatus.loading = false;
        state.studentGroupStatus.data = action.payload.data;
        state.studentGroupStatus.total = action.payload.total;
      })
      .addCase(fetchStudentGroupStatus.rejected, (state, action) => {
        state.studentGroupStatus.loading = false;
        state.studentGroupStatus.error = action.error.message || "Failed to fetch";
      });

    // Group Topic Status
    builder
      .addCase(fetchGroupTopicStatus.pending, (state) => {
        state.groupTopicStatus.loading = true;
        state.groupTopicStatus.error = null;
      })
      .addCase(fetchGroupTopicStatus.fulfilled, (state, action) => {
        state.groupTopicStatus.loading = false;
        state.groupTopicStatus.data = action.payload;
      })
      .addCase(fetchGroupTopicStatus.rejected, (state, action) => {
        state.groupTopicStatus.loading = false;
        state.groupTopicStatus.error = action.error.message || "Failed to fetch";
      });

    // Defense Result Summary
    builder
      .addCase(fetchDefenseResultSummary.pending, (state) => {
        state.defenseResultSummary.loading = true;
        state.defenseResultSummary.error = null;
      })
      .addCase(fetchDefenseResultSummary.fulfilled, (state, action) => {
        state.defenseResultSummary.loading = false;
        state.defenseResultSummary.data = action.payload;
      })
      .addCase(fetchDefenseResultSummary.rejected, (state, action) => {
        state.defenseResultSummary.loading = false;
        state.defenseResultSummary.error = action.error.message || "Failed to fetch";
      });

    // Defense Result By Round
    builder
      .addCase(fetchDefenseResultByRound.pending, (state) => {
        state.defenseResultByRound.loading = true;
        state.defenseResultByRound.error = null;
      })
      .addCase(fetchDefenseResultByRound.fulfilled, (state, action) => {
        state.defenseResultByRound.loading = false;
        state.defenseResultByRound.data = action.payload;
      })
      .addCase(fetchDefenseResultByRound.rejected, (state, action) => {
        state.defenseResultByRound.loading = false;
        state.defenseResultByRound.error = action.error.message || "Failed to fetch";
      });

    // Group Creation Type
    builder
      .addCase(fetchGroupCreationType.pending, (state) => {
        state.groupCreationType.loading = true;
        state.groupCreationType.error = null;
      })
      .addCase(fetchGroupCreationType.fulfilled, (state, action) => {
        state.groupCreationType.loading = false;
        state.groupCreationType.data = action.payload;
      })
      .addCase(fetchGroupCreationType.rejected, (state, action) => {
        state.groupCreationType.loading = false;
        state.groupCreationType.error = action.error.message || "Failed to fetch";
      });
  },
});

export const selectStatistics = (state: RootState) => state.statistics;
export default statisticsSlice.reducer;