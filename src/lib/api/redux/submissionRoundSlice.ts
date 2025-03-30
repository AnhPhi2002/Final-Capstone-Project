import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { SubmissionRound } from "@/lib/api/types";

// ✅ Fetch danh sách vòng nộp theo kỳ học
export const fetchSubmissionRounds = createAsyncThunk(
  "submissionRounds/fetchSubmissionRounds",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/submission-periods/semester/${semesterId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy danh sách vòng nộp");
    }
  }
);

// ✅ Fetch chi tiết vòng nộp
export const fetchSubmissionRoundDetail = createAsyncThunk(
  "submissionRounds/fetchSubmissionRoundDetail",
  async (roundId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/submission-periods/${roundId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy chi tiết vòng nộp");
    }
  }
);

// ✅ Tạo mới vòng nộp
export const createSubmissionRound = createAsyncThunk(
  "submissionRounds/createSubmissionRound",
  async (newRound: Partial<SubmissionRound>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/submission-periods", newRound);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tạo vòng nộp");
    }
  }
);

// ✅ Cập nhật vòng nộp
export const updateSubmissionRound = createAsyncThunk(
  "submissionRounds/updateSubmissionRound",
  async ({ roundId, updatedData }: { roundId: string; updatedData: Partial<SubmissionRound> }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/submission-periods/${roundId}`, updatedData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật vòng nộp");
    }
  }
);

// ✅ Xóa vòng nộp
export const deleteSubmissionRound = createAsyncThunk(
  "submissionRounds/deleteSubmissionRound",
  async (roundId: string, { rejectWithValue }) => {
    try {
      await axiosClient.put(`/submission-periods/${roundId}/delete`);
      return roundId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể xóa vòng nộp");
    }
  }
);

// ✅ State mặc định
const initialState = {
  data: [] as SubmissionRound[],
  roundDetail: null as SubmissionRound | null,
  loading: false,
  error: null as string | null,
  creating: false,
  updating: false,
  deleting: false,
};

// ✅ Slice
const submissionRoundSlice = createSlice({
  name: "submissionRounds",
  initialState,
  reducers: {
    clearSubmissionRounds: (state) => {
      state.data = [];
      state.roundDetail = null;
      state.error = null;
    },
    clearSubmissionRoundDetail: (state) => {
      state.roundDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch danh sách vòng nộp
      .addCase(fetchSubmissionRounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionRounds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubmissionRounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Fetch chi tiết vòng nộp
      .addCase(fetchSubmissionRoundDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.roundDetail = null;
      })
      .addCase(fetchSubmissionRoundDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.roundDetail = action.payload;
      })
      .addCase(fetchSubmissionRoundDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Tạo mới vòng nộp
      .addCase(createSubmissionRound.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createSubmissionRound.fulfilled, (state, action) => {
        state.creating = false;
        state.data.push(action.payload.data);
      })
      .addCase(createSubmissionRound.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      })

      // ✅ Cập nhật vòng nộp
      .addCase(updateSubmissionRound.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSubmissionRound.fulfilled, (state, action) => {
        state.updating = false;
        state.roundDetail = action.payload;

        // ✅ Cập nhật danh sách nếu vòng nộp tồn tại trong danh sách
        const index = state.data.findIndex((round) => round.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateSubmissionRound.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      })

      // ✅ Xóa vòng nộp
      .addCase(deleteSubmissionRound.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteSubmissionRound.fulfilled, (state, action) => {
        state.deleting = false;
        state.data = state.data.filter((round) => round.id !== action.payload);

        // ✅ Nếu vòng nộp bị xóa là vòng đang xem, thì reset `roundDetail`
        if (state.roundDetail?.id === action.payload) {
          state.roundDetail = null;
        }
      })
      .addCase(deleteSubmissionRound.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSubmissionRounds, clearSubmissionRoundDetail } = submissionRoundSlice.actions;
export default submissionRoundSlice.reducer;
