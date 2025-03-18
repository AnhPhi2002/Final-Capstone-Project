// meetingSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client"; // Giả sử bạn đã cấu hình axiosClient

// Type cho Meeting
export interface Meeting {
  id?: string;
  groupId: string;
  meetingTime: string;
  groupCode?: string;
  location: string;
  agenda: string;
  url: string;
  semesterId?: string;
}

// Tạo meeting
export const createMeeting = createAsyncThunk(
  "meetings/createMeeting",
  async (
    { semesterId, meetingData }: { semesterId: string; meetingData: Meeting },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        `/meetings/create?semesterId=${semesterId}`,
        meetingData
      );
      return response.data.data; // Giả sử API trả về dữ liệu meeting vừa tạo
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create meeting"
      );
    }
  }
);

// Lấy danh sách meeting
export const fetchMeetings = createAsyncThunk(
  "meetings/fetchMeetings",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/meetings/lecturer/main?semesterId=${semesterId}`
      );
      return response.data.data; // Giả sử API trả về mảng các meeting
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch meetings"
      );
    }
  }
);

// Meeting Slice
const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    meetings: [] as Meeting[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create Meeting
    builder
      .addCase(createMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings.push(action.payload); // Thêm meeting mới vào danh sách
      })
      .addCase(createMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Meetings
      .addCase(fetchMeetings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings = action.payload; // Cập nhật danh sách meeting
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default meetingSlice.reducer;