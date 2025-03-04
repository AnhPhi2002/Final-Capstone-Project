import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../config/axios-client";

interface Topic {
  id: string;
  nameVi: string;
  nameEn: string;
  name: string;
  description: string;
  isBusiness: boolean;
  businessPartner: string | null;
  source: string | null;
  semesterId: string;
  majorId: string;
  status: string;
  creator?: {
    fullName: string;
    email: string;
  };
  documents: {
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
  createdAt: string;
}

// Fetch danh sách topic theo semesterId
export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (
    { semesterId, majorId }: { semesterId: string; majorId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(`/topics/semester/${semesterId}`, {
        params: { majorId }, // Thêm `majorId` vào params nếu có
      });
      return response.data.data as Topic[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const exportTopicsToExcel = createAsyncThunk(
  "topics/exportExcel",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/topics/export/excel?semesterId=${semesterId}`,
        { responseType: "blob" } // API trả về file
      );

      // Xử lý tải file về máy
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Danh_sach_de_tai_${semesterId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return true; // Thành công
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Xuất danh sách thất bại!"
      );
    }
  }
);

// Fetch chi tiết topic theo topicId
export const fetchTopicDetail = createAsyncThunk(
  "topics/fetchTopicDetail",
  async (topicId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/${topicId}`);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải chi tiết đề tài."
      );
    }
  }
);

// Create new topic
export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (newTopic: Partial<Topic>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/topics`, newTopic);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tạo đề tài."
      );
    }
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async (
    { topicId, updatedData }: { topicId: string; updatedData: Partial<Topic> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/topics/${topicId}`, updatedData);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể cập nhật đề tài."
      );
    }
  }
);

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    data: [] as Topic[],
    topicDetails: null as Topic | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopics.fulfilled,
        (state, action: PayloadAction<Topic[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopicDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopicDetail.fulfilled,
        (state, action: PayloadAction<Topic>) => {
          state.topicDetails = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTopicDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.loading = false;
        const newTopic = action.payload;
        if (!newTopic.creator) {
          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          newTopic.creator = {
            fullName: currentUser.fullName,
            email: currentUser.email,
          };
        }
        state.data.unshift(newTopic);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.loading = false;
        state.topicDetails = action.payload; // Cập nhật thông tin trong Redux store
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topicSlice.reducer;
