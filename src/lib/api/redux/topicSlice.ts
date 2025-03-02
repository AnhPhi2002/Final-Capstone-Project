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
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/semester/${semesterId}`);
      return response.data.data as Topic[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Fetch chi tiết topic theo topicId
export const fetchTopicDetail = createAsyncThunk(
  "topics/fetchTopicDetail",
  async (topicId: string, { rejectWithValue }) => {
    try {
      console.log("Fetching topic details from API for ID:", topicId);
      const response = await axiosClient.get(`/topics/${topicId}`);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết đề tài.");
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
      .addCase(fetchTopics.fulfilled, (state, action: PayloadAction<Topic[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopicDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicDetail.fulfilled, (state, action: PayloadAction<Topic>) => {
        console.log("Updating topicDetails in Redux:", action.payload);
        state.topicDetails = action.payload; // ✅ Luôn cập nhật state
        state.loading = false;
      })
      .addCase(fetchTopicDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topicSlice.reducer;
