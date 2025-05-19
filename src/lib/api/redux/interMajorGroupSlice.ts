import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface InterMajorGroup {
  id: string;
  majorPairConfigId: string;
}

interface InterMajorGroupState {
  createdGroup: InterMajorGroup | null;
  loading: boolean;
  error: string | null;
}

const initialState: InterMajorGroupState = {
  createdGroup: null,
  loading: false,
  error: null,
};

// ✅ API: POST /inter-major-groups với { majorPairConfigId }
export const createInterMajorGroup = createAsyncThunk(
  "interMajorGroup/create",
  async (
    {
      majorPairConfigId,
    }: {
      majorPairConfigId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post("/inter-major-groups", {
        majorPairConfigId,
      });
      return response.data.data as InterMajorGroup;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo nhóm liên ngành!"
      );
    }
  }
);

export const createInterMajorGroupForAcademic = createAsyncThunk(
  "groups/createInterMajorGroupForAcademic",
  async (
    {
      leaderEmail,
      majorPairConfigId,
    }: {
      leaderEmail: string;
      majorPairConfigId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        "/create-inter-major-group-by-academic",
        {
          leaderEmail,
          majorPairConfigId,
        }
      );
      return response.data.group;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo nhóm liên ngành!"
      );
    }
  }
);


const interMajorGroupSlice = createSlice({
  name: "interMajorGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInterMajorGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createInterMajorGroup.fulfilled,
        (state, action: PayloadAction<InterMajorGroup>) => {
          state.loading = false;
          state.createdGroup = action.payload;
        }
      )
      .addCase(createInterMajorGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createInterMajorGroupForAcademic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createInterMajorGroupForAcademic.fulfilled,
        (state, action: PayloadAction<InterMajorGroup>) => {
          state.loading = false;
          state.createdGroup = action.payload;
        }
      )
      .addCase(createInterMajorGroupForAcademic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});

export const interMajorGroupReducer = interMajorGroupSlice.reducer;
