import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../config/axios-client";

interface Topic {
  id: string;
  topicCode: string;
  name: string;
  description: string;
  isBusiness: boolean;
  businessPartner: string | null;
  source: string | null;
  status: string;
  isMultiMajor: boolean;
  createdAt: string;
  semester: {
    id: string;
    code: string;
    startDate: string;
    endDate: string;
    status: string;
    year: {
      id: string;
      year: number;
    };
  };
  creator: {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
  };
  detailMajorTopics: {
    major: {
      id: string;
      name: string;
    };
  }[];
  topicRegistrations: {
    id: string;
    role: string;
    status: string;
    userId: string;
    registeredAt: string;
  }[];
  documents: {
    id: string;
    name: string;
    url: string;
  }[];
}


// Thunk để fetch danh sách topic
export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async ({ semesterId, majorId }: { semesterId: string; majorId?: string }, { rejectWithValue }) => {
    try {
      const query = majorId ? `?semesterId=${semesterId}&majorId=${majorId}` : `?semesterId=${semesterId}`;
      const response = await axiosClient.get(`/topics${query}`);
      return response.data.data.data as Topic[]; // Định dạng đúng kiểu dữ liệu
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Thunk để export Excel
export const exportTopicsToExcel = createAsyncThunk(
  "topics/exportExcel",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/topics/export/excel?semesterId=${semesterId}`,
        { responseType: "blob" } // API trả về file
      );

      // Xử lý tải file về máy
      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Danh_sach_de_tai_${semesterId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return true; // Thành công
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Xuất danh sách thất bại!");
    }
  }
);

// Thunk để fetch chi tiết đề tài
export const fetchTopicDetail = createAsyncThunk(
  "topics/fetchTopicDetail",
  async (topicId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/${topicId}`);
      return response.data.data as Topic; // Dữ liệu đúng kiểu
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết đề tài.");
    }
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async ({ topicId, updatedData }: { topicId: string; updatedData: any }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/topics/register/${topicId}`, updatedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Cập nhật đề tài thất bại");
    }
  }
);

// Định nghĩa kiểu dữ liệu cho Redux state
interface TopicState {
  data: Topic[];
  topicDetails: Topic | null;
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: TopicState = {
  data: [],
  topicDetails: null,
  loading: false,
  error: null,
};

// Slice Redux để quản lý state
const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch danh sách topic
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action: PayloadAction<Topic[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Export Excel
      .addCase(exportTopicsToExcel.pending, (state) => {
        state.loading = true;
      })
      .addCase(exportTopicsToExcel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportTopicsToExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch chi tiết topic
      .addCase(fetchTopicDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.topicDetails = null; // Đặt về null trước khi tải dữ liệu mới
      })
      .addCase(fetchTopicDetail.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.loading = false;
        state.topicDetails = action.payload; // Lưu dữ liệu chi tiết topic
      })
      .addCase(fetchTopicDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topicDetails = action.payload;
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topicSlice.reducer;
