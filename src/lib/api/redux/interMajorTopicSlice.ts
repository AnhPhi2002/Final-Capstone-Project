import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { Topic } from "./types/topic";

// API tạo đề tài liên ngành
export const createInterMajorTopic = createAsyncThunk(
  "interMajorTopic/createInterMajorTopic",
  async (
    newTopic: Partial<Topic> & { majorPairConfigId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(`/inter-major-topics`, newTopic);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tạo đề tài liên ngành."
      );
    }
  }
);

export const createInterMajorTopicByAcademic = createAsyncThunk(
  "interMajorTopics/createInterMajorTopicByAcademic",
  async (
    newTopic: Partial<Topic> & { majorPairConfigId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post("/inter-major-topics/with-mentors", newTopic);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tạo đề tài liên ngành."
      );
    }
  }
);

const interMajorTopicSlice = createSlice({
  name: "interMajorTopic",
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInterMajorTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterMajorTopic.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createInterMajorTopic.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(createInterMajorTopicByAcademic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterMajorTopicByAcademic.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createInterMajorTopicByAcademic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default interMajorTopicSlice.reducer;