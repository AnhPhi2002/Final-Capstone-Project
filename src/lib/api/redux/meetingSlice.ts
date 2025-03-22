import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

export interface Meeting {
  id?: string;
  groupId: string;
  meetingTime: string;
  location: string;
  agenda: string;
  url: string;
  mentor: {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
  };
}

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
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create meeting");
    }
  }
);

export const fetchMeetings = createAsyncThunk(
  "meetings/fetchMeetings",
  async (semesterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/meetings/lecturer/main?semesterId=${semesterId}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch meetings");
    }
  }
);

export const fetchMeetingsByGroup = createAsyncThunk(
  "meetings/fetchByGroup",
  async (
    { groupId, semesterId }: { groupId: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.get(`/meetings/group/${groupId}?semesterId=${semesterId}`);
      console.log("a");
      
      console.log("fetchMeetingsByGroup response:", res.data.data); 
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Lỗi khi lấy meetings!");
    }
  }
);

export const updateMeeting = createAsyncThunk(
  "meetings/updateMeeting",
  async (
    { meetingId, semesterId, meetingData }: { meetingId: string; semesterId: string; meetingData: Partial<Meeting> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(
        `/meetings/${meetingId}?semesterId=${semesterId}`,
        meetingData
      );
      return response.data.data; // Giả sử API trả về meeting đã cập nhật
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update meeting");
    }
  }
);

const meetingSlice = createSlice({
  name: "meetings",
  initialState: {
    meetings: [] as Meeting[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    resetMeetings: (state) => {
      state.meetings = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings.push(action.payload);
      })
      .addCase(createMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMeetings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings = action.payload;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMeetingsByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeetingsByGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings = action.payload;
        console.log("fetchMeetingsByGroup fulfilled:", action.payload); // Log để kiểm tra
      })
      .addCase(fetchMeetingsByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.loading = false;
        const updatedMeeting = action.payload;
        const index = state.meetings.findIndex((m) => m.id === updatedMeeting.id);
        if (index !== -1) {
          state.meetings[index] = updatedMeeting; // Cập nhật meeting trong danh sách
        }
      })
      .addCase(updateMeeting.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      ;
  },
});

export const { resetMeetings } = meetingSlice.actions;
export default meetingSlice.reducer;