import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

// Fetch config values one key at a time
export const fetchConfig = createAsyncThunk(
  "config/fetchConfig",
  async (keys: string[], { rejectWithValue }) => {
    try {
      const promises = keys.map(async (key) => {
        const response = await axiosClient.get(`/config/?key=${key}`);
        return response.data.data; // ✅ Lấy đúng data từ response
      });

      const results = await Promise.all(promises);
      return results;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch config");
    }
  }
);

// Update config value
export const updateConfig = createAsyncThunk(
  "config/updateConfig",
  async (
    payload: { key: string; value: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put("/config/update", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update config");
    }
  }
);

const configSlice = createSlice({
  name: "config",
  initialState: {
    configData: {} as Record<string, { key: string; value: string; description?: string }>,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.configData = action.payload.reduce(
          (acc: Record<string, { key: string; value: string; description?: string }>, item: any) => {
            acc[item.key] = {
              key: item.key,
              value: item.value,
              description: item.description || "",
            };
            return acc;
          },
          {}
        );
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfig.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = configSlice.actions;
export default configSlice.reducer;
