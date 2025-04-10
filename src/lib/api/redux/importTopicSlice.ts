import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TopicState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TopicState = {
  loading: false,
  error: null,
  success: false,
};

// Action để import topic updates
export const importTopicUpdate = createAsyncThunk(
  'topic/importTopicUpdate',
  async ({ formData, semesterId }: { formData: FormData; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/import-topic-updates?semesterId=${semesterId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Import thất bại');
    }
  }
);

const importTopicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importTopicUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(importTopicUpdate.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(importTopicUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetState } = importTopicSlice.actions;
export default importTopicSlice.reducer;