import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

interface Topic {
  id: string;
  topicCode: string;
  nameVi: string;
  nameEn: string;
  description: string;
  status: string;
  createdAt: string;
}

// 🟢 Fetch danh sách đề tài có thể đăng ký
export const fetchAvailableTopics = createAsyncThunk(
  "topics/fetchAvailableTopics",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/available-topics`, {
        params: { semesterId },
      });
      return response.data.data as Topic[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể lấy danh sách đề tài."
      );
    }
  }
);

// 🟢 Fetch chi tiết đề tài từ danh sách đề tài đã tải
export const fetchTopicDetailFromList = createAsyncThunk(
  "topics/fetchTopicDetailFromList",
  async ({ topicId}: { topicId: string; semesterId: string }, { getState, rejectWithValue }) => {
    const state: any = getState();
    const topicList = state.topicStudents.availableTopics;

    if (!topicList || topicList.length === 0) {
      return rejectWithValue("Danh sách đề tài trống hoặc chưa tải.");
    }

    const topicDetail = topicList.find((t: Topic) => t.id === topicId);

    if (!topicDetail) {
      return rejectWithValue("Không tìm thấy đề tài.");
    }

    return topicDetail;
  }
);

// 🟢 Gửi yêu cầu đăng ký đề tài
export const registerTopic = createAsyncThunk(
  "topics/registerTopic",
  async ({ topicId, semesterId }: { topicId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        `/topics/topic-registrations?semesterId=${semesterId}`,
        { topicId }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể đăng ký đề tài.");
    }
  }
);

const topicStudentSlice = createSlice({
  name: "topicStudents",
  initialState: {
    availableTopics: [] as Topic[],
    topicDetails: null as Topic | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTopics.fulfilled, (state, action: PayloadAction<Topic[]>) => {
        state.availableTopics = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTopicDetailFromList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicDetailFromList.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.topicDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopicDetailFromList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerTopic.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topicStudentSlice.reducer;
