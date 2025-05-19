import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface Major {
  id: string;
  name: string;
}

export interface InterMajorConfig {
  id: string;
  name: string;
  semesterId: string;
  firstMajorId: string;
  secondMajorId: string;
  isActive: boolean;
  isDeleted: boolean;
  firstMajor: Major;
  secondMajor: Major;
}

interface InterMajorState {
  data: InterMajorConfig[];
  selected: InterMajorConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: InterMajorState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

// ✅ API: Lấy danh sách theo semesterId
export const fetchInterMajorConfigs = createAsyncThunk(
  "interMajor/fetchInterMajorConfigs",
  async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/inter-major-configs", {
        params: { semesterId },
      });
      return response.data.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch inter-major configs");
    }
  }
);

export const fetchInterMajorConfigsForStudent = createAsyncThunk(
  "interMajor/fetchInterMajorConfigsForStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/inter-major-configs");
      return response.data.data || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch inter-major configs");
    }
  }
);

export const fetchInterMajorById = createAsyncThunk(
  "interMajor/fetchInterMajorById",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/inter-major-configs/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch inter-major config");
    }
  }
);


// ✅ API: Tạo liên kết liên ngành mới
export const createInterMajorConfig = createAsyncThunk(
  "interMajor/createInterMajorConfig",
  async (
    {
      name,
      semesterId,
      firstMajorId,
      secondMajorId,
    }: {
      name: string;
      semesterId: string;
      firstMajorId: string;
      secondMajorId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post("/inter-major-configs", {
        name,
        semesterId,
        firstMajorId,
        secondMajorId,
      });
      return response.data.data; // Trả về bản ghi mới
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create inter-major config");
    }
  }
);

export const updateInterMajorConfig = createAsyncThunk(
  "interMajor/updateInterMajorConfig",
  async (
    {
      id,
      name,
      semesterId,
      firstMajorId,
      secondMajorId,
      isActive,
    }: {
      id: string;
      name: string;
      semesterId: string;
      firstMajorId: string;
      secondMajorId: string;
      isActive: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/inter-major-configs/${id}`, {
        name,
        semesterId,
        firstMajorId,
        secondMajorId,
        isActive,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update inter-major config");
    }
  }
);

export const deleteInterMajorConfig = createAsyncThunk(
  "interMajor/deleteInterMajorConfig",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/inter-major-configs/${id}/delete`);
      return id; // Trả về id để filter trong state
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete inter-major config");
    }
  }
);


const interMajorSlice = createSlice({
  name: "interMajor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterMajorConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterMajorConfigs.fulfilled, (state, action: PayloadAction<InterMajorConfig[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInterMajorConfigs.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(fetchInterMajorConfigsForStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterMajorConfigsForStudent.fulfilled, (state, action: PayloadAction<InterMajorConfig[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInterMajorConfigsForStudent.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(fetchInterMajorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterMajorById.fulfilled, (state, action: PayloadAction<InterMajorConfig>) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchInterMajorById.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      });

    builder
      .addCase(createInterMajorConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterMajorConfig.fulfilled, (state) => {
        state.loading = false;
        // state.data.push(action.payload);
      })
      .addCase(createInterMajorConfig.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      // PUT
.addCase(updateInterMajorConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInterMajorConfig.fulfilled, (state, action: PayloadAction<InterMajorConfig>) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.data.findIndex(item => item.id === updated.id);
        if (index !== -1) state.data[index] = updated;
        if (state.selected?.id === updated.id) state.selected = updated;
      })
      .addCase(updateInterMajorConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // DELETE
      .addCase(deleteInterMajorConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInterMajorConfig.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const id = action.payload;
        state.data = state.data.filter(item => item.id !== id);
        if (state.selected?.id === id) state.selected = null;
      })
      .addCase(deleteInterMajorConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default interMajorSlice.reducer;
