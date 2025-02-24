import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../config/axios-client";

// Action tạo đề tài mới
export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (
    { name, description, semesterId, majorId, isBusiness, businessPartner }: 
    { name: string; description: string; semesterId: string; majorId: string, isBusiness: boolean, businessPartner: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post("/topics/register", {
        name,
        description,
        semesterId,
        majorId,
        isBusiness,
        businessPartner,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

type TopicRegisterState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: TopicRegisterState = {
  loading: false,
  success: false,
  error: null,
};

const topicRegisterSlice = createSlice({
  name: "topicRegister",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createTopic.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = topicRegisterSlice.actions;
export default topicRegisterSlice.reducer;
