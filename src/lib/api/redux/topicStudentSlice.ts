import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { Topic } from "../types";


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

export const fetchAllTopicsStudent = createAsyncThunk(
  "topic/fetchAllTopicsStudent",
  async (_, {rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/student/topics/approved/all`);
      return response.data.data as Topic[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy danh sách đ�� tài.");
    }
  }
);

// 🟢 Lấy chi tiết đề tài từ danh sách đã tải
export const fetchTopicStudentDetailFromList = createAsyncThunk(
  "topics/fetchTopicStudentDetailFromList",
  async (topicId: string, { getState, rejectWithValue }) => {
    const state: any = getState();
    const topicList = state.topicStudents.availableTopics;

    // Nếu danh sách trống, không có dữ liệu
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
      .addCase(fetchAllTopicsStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTopicsStudent.fulfilled, (state, action: PayloadAction<Topic[]>) => {
        state.availableTopics = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTopicsStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  
      // ✅ Xử lý fetchTopicDetailFromList (Lấy từ danh sách có sẵn)
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
  
      // ✅ Xử lý fetchTopicStudentDetailFromList (Dành cho student)
      .addCase(fetchTopicStudentDetailFromList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicStudentDetailFromList.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.topicDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopicStudentDetailFromList.rejected, (state, action) => {
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
  }
  ,
});

export default topicStudentSlice.reducer;
