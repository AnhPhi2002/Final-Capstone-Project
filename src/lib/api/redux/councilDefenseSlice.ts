// lib/api/redux/councilDefenseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import {
  CouncilDefense,
  CouncilDefenseMember,
  DefenseSchedule,
  CouncilDefenseSessions,
} from "../redux/types/defenseSchedule"; // Import từ defenseSchedule.ts

interface CouncilState {
  data: CouncilDefense[];
  councilDetail: CouncilDefense | null;
  loading: boolean;
  loadingDetail: boolean;
  error: string | null;
  reviewSchedules: DefenseSchedule[]; // Sửa thành DefenseSchedule
  loadingSchedules: boolean;
  errorSchedules: string | null;
  reviewSchedulesMentor: DefenseSchedule[]; // Sửa thành DefenseSchedule
  loadingSchedulesMentor: boolean;
  errorSchedulesMentor: string | null;
  councilSesstions: CouncilDefenseSessions[];
  loadingSessions: boolean;
  errorSessions: string | null;
  loadingScore: boolean;
  errorScore: string | null;
}

const initialState: CouncilState = {
  data: [],
  councilDetail: null,
  loading: false,
  loadingDetail: false,
  error: null,
  reviewSchedules: [],
  loadingSchedules: false,
  errorSchedules: null,
  reviewSchedulesMentor: [],
  loadingSchedulesMentor: false,
  errorSchedulesMentor: null,
  councilSesstions: [],
  loadingSessions: false,
  errorSessions: null,
  loadingScore: false,
  errorScore: null,
};

export const createCouncilDefense = createAsyncThunk(
  "councils/createCouncilDefense",
  async (newCouncil: Partial<CouncilDefense>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/council-defense`, newCouncil);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tạo hội đồng!");
    }
  }
);

export const fetchDefenseCouncilsList = createAsyncThunk(
  "councils/fetchDefenseCouncils",
  async (
    { semesterId, submissionPeriodId }: { semesterId: string; submissionPeriodId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(`/council-defense`, {
        params: { semesterId, submissionPeriodId },
      });

      const councils = response.data.data as CouncilDefense[];
      const filteredCouncils = councils.filter((council) => council.isDeleted === false);
      return filteredCouncils;
    } catch (error: any) {
      console.error("API fetchDefenseCouncilsList error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách hội đồng!");
    }
  }
);

export const fetchCouncilDetail = createAsyncThunk(
  "councils/fetchCouncilDetail",
  async (councilId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/council-defense/${councilId}`);
      const council = response.data.data as CouncilDefense;
      if (council.isDeleted) {
        return rejectWithValue("Hội đồng đã bị xóa!");
      }
      return council;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết hội đồng!");
    }
  }
);

export const fetchCouncilDefenseDetailForMentor = createAsyncThunk(
  "councils/fetchCouncilDefenseDetailForMentor",
  async (
    { councilId, semesterId }: { councilId: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(`/council-defense/${councilId}/details`, {
        params: { semesterId },
      });
      const council = response.data.data as CouncilDefense;
      if (council.isDeleted) {
        return rejectWithValue("Hội đồng đã bị xóa!");
      }
      return council;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết hội đồng!");
    }
  }
);

export const updateCouncilDefense = createAsyncThunk(
  "councils/updateCouncilDefense",
  async (
    { councilId, updatedData }: { councilId: string; updatedData: Partial<CouncilDefense> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/council-defense/${councilId}`, updatedData);
      return response.data.data as CouncilDefense;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật hội đồng!");
    }
  }
);

export const deleteCouncil = createAsyncThunk(
  "councils/deleteCouncil",
  async (councilId: string, { rejectWithValue }) => {
    try {
      await axiosClient.put(`/council-defense/${councilId}/delete`);
      return councilId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể xóa hội đồng!");
    }
  }
);

export const addCouncilMember = createAsyncThunk(
  "councils/addCouncilMember",
  async (
    {
      councilId,
      email,
      role,
    }: {
      councilId: string;
      email: string;
      role: "council_chairman" | "council_secretary" | "council_member";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(`/council-defense/${councilId}/members`, {
        email,
        role,
      });
      return response.data.data as CouncilDefenseMember;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể thêm thành viên vào hội đồng!");
    }
  }
);

export const deleteCouncilMember = createAsyncThunk(
  "councils/deleteCouncilMember",
  async (
    { councilId, userId }: { councilId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.delete(`/council-defense/council/${councilId}/user/${userId}`);
      console.log("API deleteCouncilMember response:", response.data);
      return { councilId, userId };
    } catch (error: any) {
      console.error("API deleteCouncilMember error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Không thể xóa thành viên khỏi hội đồng!");
    }
  }
);

export const createDefenseSchedule = createAsyncThunk(
  "councils/createDefenseSchedule",
  async (
    scheduleData: { councilId: string; groups: { groupId: string; reviewTime: string }[]; room: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(`/council-defense/schedules`, scheduleData);
      console.log("API createDefenseSchedule response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("API createDefenseSchedule error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Không thể tạo lịch bảo vệ!");
    }
  }
);

export const fetchDefenseSchedulesForStudent = createAsyncThunk(
  "councilDefense/fetchDefenseSchedulesForStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/council-defense/student/schedules");
      if (response.data.success) {
        return response.data.data as DefenseSchedule[];
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải lịch bảo vệ!");
    }
  }
);

export const fetchDefenseSchedulesForMentor = createAsyncThunk(
  "councilDefense/fetchDefenseSchedulesForMentor",
  async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/council-defense/mentor/schedules", {
        params: { semesterId },
      });
      if (response.data.success) {
        return response.data.data as DefenseSchedule[];
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải lịch bảo vệ!");
    }
  }
);

export const evaluateStudentDefense = createAsyncThunk(
  "councilDefense/evaluateStudentDefense",
  async (
    {
      scheduleId,
      studentId,
      semesterId,
      result,
      feedback,
    }: {
      scheduleId: string;
      studentId: string;
      semesterId: string;
      result: "PASS" | "NOT_PASS";
      feedback: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(
        `/council-defense/schedules/${scheduleId}/students/${studentId}/evaluate`,
        { result, feedback },
        { params: { semesterId } }
      );
      return response.data.data; // Giả sử API trả về MemberResult đã cập nhật
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể chấm điểm cho sinh viên!");
    }
  }
);

const councilDefenseSlice = createSlice({
  name: "councilDefense",
  initialState,
  reducers: {
    clearCouncils: (state) => {
      state.data = [];
      state.councilDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCouncilDefense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCouncilDefense.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createCouncilDefense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDefenseCouncilsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefenseCouncilsList.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Updating councils state with payload:", action.payload);
        state.data = action.payload;
      })
      .addCase(fetchDefenseCouncilsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCouncilDetail.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchCouncilDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.councilDetail = action.payload;
      })
      .addCase(fetchCouncilDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCouncilDefenseDetailForMentor.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchCouncilDefenseDetailForMentor.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.councilDetail = action.payload;
      })
      .addCase(fetchCouncilDefenseDetailForMentor.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(updateCouncilDefense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCouncilDefense.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCouncil = action.payload;
        state.data = state.data.map((council) =>
          council.id === updatedCouncil.id ? updatedCouncil : council
        );
        if (state.councilDetail?.id === updatedCouncil.id) {
          state.councilDetail = updatedCouncil;
        }
      })
      .addCase(updateCouncilDefense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCouncil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCouncil.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((council) => council.id !== action.payload);
        if (state.councilDetail?.id === action.payload) {
          state.councilDetail = null;
        }
      })
      .addCase(deleteCouncil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCouncilMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCouncilMember.fulfilled, (state, action) => {
        state.loading = false;
        if (state.councilDetail) {
          state.councilDetail.members.push(action.payload);
        }
      })
      .addCase(addCouncilMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCouncilMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCouncilMember.fulfilled, (state, action) => {
        state.loading = false;
        const { councilId, userId } = action.payload;
        if (state.councilDetail?.id === councilId) {
          state.councilDetail.members = state.councilDetail.members.filter(
            (member) => member.userId !== userId
          );
        }
      })
      .addCase(deleteCouncilMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDefenseSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDefenseSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDefenseSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDefenseSchedulesForStudent.pending, (state) => {
        state.loadingSchedules = true;
        state.errorSchedules = null;
        state.reviewSchedules = [];
      })
      .addCase(fetchDefenseSchedulesForStudent.fulfilled, (state, action) => {
        state.loadingSchedules = false;
        state.reviewSchedules = action.payload;
      })
      .addCase(fetchDefenseSchedulesForStudent.rejected, (state, action) => {
        state.loadingSchedules = false;
        state.errorSchedules = action.payload as string;
        state.reviewSchedules = [];
      })
      .addCase(fetchDefenseSchedulesForMentor.pending, (state) => {
        state.loadingSchedulesMentor = true;
        state.errorSchedulesMentor = null;
        state.reviewSchedulesMentor = [];
      })
      .addCase(fetchDefenseSchedulesForMentor.fulfilled, (state, action) => {
        state.loadingSchedulesMentor = false;
        state.reviewSchedulesMentor = action.payload;
      })
      .addCase(fetchDefenseSchedulesForMentor.rejected, (state, action) => {
        state.loadingSchedulesMentor = false;
        state.errorSchedulesMentor = action.payload as string;
        state.reviewSchedulesMentor = [];
      })
      .addCase(evaluateStudentDefense.pending, (state) => {
        state.loadingScore = true;
        state.errorScore = null;
      })
      .addCase(evaluateStudentDefense.fulfilled, (state, action) => {
        state.loadingScore = false;
        const updatedResult = action.payload;
        const { scheduleId, studentId } = action.meta.arg;
      
        const schedule = state.councilDetail?.defenseSchedules.find(s => s.id === scheduleId);
        if (schedule) {
          const index = schedule.memberResults.findIndex(mr => mr.studentId === studentId);
          if (index !== -1) {
            schedule.memberResults[index] = {
              ...schedule.memberResults[index], // giữ lại student
              ...updatedResult, // chỉ ghi đè result, feedback, evaluatedBy
            };
          }
        }
      })
      .addCase(evaluateStudentDefense.rejected, (state, action) => {
        state.loadingScore = false;
        state.errorScore = action.payload as string;
      });
  },
});

export const { clearCouncils } = councilDefenseSlice.actions;
export default councilDefenseSlice.reducer;