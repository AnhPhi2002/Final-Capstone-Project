  import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
  import { axiosClient } from "../config/axios-client";

  interface Guidance {
    mssv: string;
    studentName: string;
    groupCode: string;
    topicCode: string;
    topicNameEnglish: string;
    topicNameVietnamese: string;
    mentor: string;
    major: string;
    stt: number;
  }

  interface GuidanceState {
    guidanceList: Guidance[];
    loading: boolean;
    error: string | null;
  }

  const initialState: GuidanceState = {
    guidanceList: [],
    loading: false,
    error: null,
  };

  export const fetchGuidanceList = createAsyncThunk(
    'decisionTable/fetchGuidanceList',
    async (
      { semesterId, includeAI }: { semesterId: string; includeAI: boolean },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosClient.get('/guidance-list', {
          params: { semesterId, includeAI: includeAI ? 'true' : 'false' }, // Chuyển boolean thành chuỗi
        });
        console.log("Phản hồi API:", response.data); // Ghi log để kiểm tra
        return response.data.data || []; // Dự phòng mảng rỗng
      } catch (error: any) {
        console.error("Lỗi API:", error);
        return rejectWithValue(
          error.response?.data?.message || 'Lỗi khi lấy danh sách hướng dẫn'
        );
      }
    }
  );

  const getDecisionListTableSlice = createSlice({
    name: 'decisionTable',
    initialState,
    reducers: {
      clearGuidanceList: (state) => {
        state.guidanceList = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGuidanceList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchGuidanceList.fulfilled, (state, action: PayloadAction<Guidance[]>) => {
          state.loading = false;
          state.guidanceList = action.payload;
          console.log("Guidance list updated in store:", action.payload);
        })
        .addCase(fetchGuidanceList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("Error in fetchGuidanceList:", action.payload);
        });
    },
  });

  export const { clearGuidanceList } = getDecisionListTableSlice.actions;
  export default getDecisionListTableSlice.reducer;