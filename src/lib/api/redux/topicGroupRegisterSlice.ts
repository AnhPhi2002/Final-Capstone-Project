import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

// Định nghĩa kiểu dữ liệu Topic
interface Topic {
  id: string;
  topicCode: string;
  nameVi: string;
  nameEn: string;
  description: string;
  status: string;
  approvalStatus: string | null;       // Trạng thái gán đề tài
  registrationStatus: string | null;   // Thêm trạng thái đăng ký
  rejectionReason?: string | null;     // Thêm lý do từ chối (tuỳ chọn)
  semester: {
    id: string;
    code: string;
    startDate: string;
    endDate: string;
  };
  createdBy: {
    fullName: string;
    email: string;
  };
  subSupervisor: {
    fullName: string;
    email: string;
  } | null;
  majors: { id: string; name: string }[];
  group: {
    id: string;
    groupCode: string;
    members: {
      id: string;
      studentId: string;
      role: { name: string };
    }[];
  } | null;
}

// State của Redux
interface TopicGroupRegisterState {
  topics: Topic[];
  topicDetails: Topic | null;
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: TopicGroupRegisterState = {
  topics: [],
  topicDetails: null,
  loading: false,
  error: null,
};

// 🔹 Fetch danh sách đề tài nhóm đã đăng ký thành công
export const fetchTopicsGroupRegistered = createAsyncThunk(
  "topics/fetchTopicsGroupRegistered",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/student/topics/approved`);
      return response.data.data as Topic[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy danh sách đề tài.");
    }
  }
);

// 🔹 Fetch chi tiết một đề tài từ danh sách đã tải
export const fetchTopicGroupDetailFromList = createAsyncThunk(
  "topics/fetchTopicGroupDetailFromList",
  async (topicId: string, { getState, rejectWithValue }) => {
    const state: any = getState();
    const topicList = state.topicGroupRegister.topics;

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

const topicGroupRegisterSlice = createSlice({
  name: "topicGroupRegister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicsGroupRegistered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsGroupRegistered.fulfilled, (state, action: PayloadAction<Topic[]>) => {
        state.topics = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopicsGroupRegistered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTopicGroupDetailFromList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicGroupDetailFromList.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.topicDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopicGroupDetailFromList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topicGroupRegisterSlice.reducer;
