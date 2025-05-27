// import { createCouncilReview } from './councilReviewSlice';
// lib/api/redux/councilReviewSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { CouncilReview, CouncilReviewMember, ReviewSchedule, CouncilReviewSessions, CouncilReviewAssignment } from "../types";

interface CouncilState {
    data: CouncilReview[];
    councilDetail: CouncilReview | null;
    loading: boolean;
    loadingDetail: boolean;
    error: string | null;
    reviewSchedules: ReviewSchedule[];
    loadingSchedules: boolean;
    errorSchedules: string | null;
    reviewSchedulesMentor: ReviewSchedule[];
    loadingSchedulesMentor: boolean;
    errorSchedulesMentor: string | null;
    councilSesstions: CouncilReviewSessions[];
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

export const updateReviewAssignmentScore = createAsyncThunk(
    "councils/updateReviewAssignmentScore",
    async (
        { assignmentId, semesterId, scoreData }: { assignmentId: string; semesterId: string; scoreData: { score: number; feedback: string; status: string } },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.put(
                `/council-review/review-assignments/${assignmentId}/update`,
                scoreData,
                {
                    params: { semesterId }, // Thêm semesterId vào query params
                }
            );
            return response.data.data as CouncilReviewAssignment;
        } catch (error: any) {
            console.error("API updateReviewAssignmentScore error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể cập nhật điểm số!");
        }
    }
);

export const createCouncilReview = createAsyncThunk(
    "councils/createCouncilReview",
    async (newCouncil: Partial<CouncilReview>, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/council-review`, newCouncil);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Không thể tạo hội đồng!");
        }
    }
);

export const fetchReviewCouncilsList = createAsyncThunk(
    "councils/fetchReviewCouncils",
    async ({ semesterId, submissionPeriodId }: { semesterId: string; submissionPeriodId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/council-review`, {
                params: { semesterId, submissionPeriodId },
            });

            const councils = response.data.data as CouncilReview[];
            const filteredCouncils = councils.filter((council) => council.isDeleted === false);
            return filteredCouncils;
        } catch (error: any) {
            console.error("API fetchReviewCouncilsList error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách hội đồng!");
        }
    }
);

export const fetchCouncilDetail = createAsyncThunk(
    "councils/fetchCouncilDetail",
    async (councilId: string, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/council-review/${councilId}`);
            const council = response.data.data as CouncilReview;
            if (council.isDeleted) {
                return rejectWithValue("Hội đồng đã bị xóa!");
            }
            return council;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết hội đồng!");
        }
    }
);

export const fetchCouncilDetailForMentor = createAsyncThunk(
    "councils/fetchCouncilDetailForMentor",
    async ({ councilId, semesterId }: { councilId: string; semesterId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/council-review/lecturers/councils/${councilId}`, {
                params: { semesterId }
            });
            const council = response.data.data as CouncilReview;
            if (council.isDeleted) {
                return rejectWithValue("Hội đồng đã bị xóa!");
            }
            return council;
        } catch (error: any) {

            return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết hội đồng!");
        }
    }
);

// Thunk để cập nhật hội đồng
export const updateCouncilReview = createAsyncThunk(
    "councils/updateCouncilReview",
    async (
        { councilId, updatedData }: { councilId: string; updatedData: Partial<CouncilReview> },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.put(`/council-review/${councilId}`, updatedData);
            console.log("API updateCouncil response:", response.data);
            // Kiểm tra response.data.data
            if (!response.data.data || !response.data.data.id) {
                throw new Error("Dữ liệu trả về từ API không hợp lệ hoặc thiếu id");
            }
            return response.data.data as CouncilReview;
        } catch (error: any) {
            console.error("API updateCouncil error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể cập nhật hội đồng!");
        }
    }
);

// Thunk để xóa hội đồng (dùng PUT)
export const deleteCouncil = createAsyncThunk(
    "councils/deleteCouncil",
    async (councilId: string, { rejectWithValue }) => {
        try {
            const response = await axiosClient.put(`/council-review/${councilId}/delete`);
            console.log("API deleteCouncil response:", response.data);
            return councilId; // Trả về councilId để xóa khỏi state
        } catch (error: any) {
            console.error("API deleteCouncil error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể xóa hội đồng!");
        }
    }
);

export const addCouncilMember = createAsyncThunk(
    "councils/addCouncilMember",
    async (
        { councilId, email }: { councilId: string; email: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.post(`/council-review/${councilId}/members`, {
                email,
                role: "council_member",
            });
            console.log("API addCouncilMember response:", response.data);
            return response.data.data as CouncilReviewMember;
        } catch (error: any) {
            console.error("API addCouncilMember error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể thêm thành viên vào hội đồng!");
        }
    }
);

// Thunk mới để xóa thành viên
export const deleteCouncilMember = createAsyncThunk(
    "councils/deleteCouncilMember",
    async (
        { councilId, userId }: { councilId: string; userId: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.delete(`/council-review/council/${councilId}/user/${userId}`);
            console.log("API deleteCouncilMember response:", response.data);
            return { councilId, userId }; // Trả về cả councilId và userId để cập nhật state
        } catch (error: any) {
            console.error("API deleteCouncilMember error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể xóa thành viên khỏi hội đồng!");
        }
    }
);

// Thunk để tạo lịch review
export const createReviewSchedule = createAsyncThunk(
    "councils/createReviewSchedule",
    async (
        scheduleData: { councilId: string; groups: { groupId: string; reviewTime: string }[]; room: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.post(`/council-review/schedules`, scheduleData);
            console.log("API createReviewSchedule response:", response.data);
            return response.data; // Không cần trả về dữ liệu cụ thể vì không lưu trong state
        } catch (error: any) {
            console.error("API createReviewSchedule error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Không thể tạo lịch review!");
        }
    }
);

export const fetchReviewSchedulesForStudent = createAsyncThunk(
    "councilReview/fetchReviewSchedulesForStudent",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/council-review/student/schedules");
            // Kiểm tra success từ API
            if (response.data.success) {
                return response.data.data as ReviewSchedule[];
            } else {
                // Nếu success: false, trả về mảng rỗng và lưu message vào error
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Không thể tải lịch chấm điểm!"
            );
        }
    }
);

export const fetchReviewSchedulesForMentor = createAsyncThunk(
    "councilReview/fetchReviewSchedulesForMentor",
    async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/council-review/mentor/schedules", {
                params: { semesterId },
            });
            if (response.data.success) {
                return response.data.data as ReviewSchedule[];
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Không thể tải lịch chấm điểm!"
            );
        }
    }
);

export const confirmDefenseRound = createAsyncThunk(
  "councils/confirmDefenseRound",
  async (
    {
      groupCode,
      defenseRound,
      mentorDecision,
      semesterId,
    }: {
      groupCode: string;
      defenseRound: number | null;    // Chú ý: không optional, luôn có giá trị number hoặc null
      mentorDecision: "PASS" | "NOT_PASS";
      semesterId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Gửi đủ cả 3 trường theo yêu cầu
      const body = {
        groupCode,
        defenseRound,    // Có thể là number hoặc null
        mentorDecision,
      };

      console.log("Payload being sent to API:", body);

      const response = await axiosClient.post(
        `/council-review/defense/confirm-defense-round?semesterId=${semesterId}`,
        body
      );

      console.log("API confirmDefenseRound response:", response.data);

      return {
        groupCode,
        defendStatus: mentorDecision === "PASS" ? "CONFIRMED" : "NOT_PASSED",
        defenseRound,
      };
    } catch (error: any) {
      console.error("API confirmDefenseRound error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Không thể xác nhận vòng bảo vệ!");
    }
  }
);

  
const councilReviewSlice = createSlice({
    name: "councils",
    initialState,
    reducers: {
        clearCouncils: (state) => {
            state.data = [];
            state.councilDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateReviewAssignmentScore.pending, (state) => {
                state.loadingScore = true;
                state.errorScore = null;
            })
            .addCase(updateReviewAssignmentScore.fulfilled, (state, action) => {
                state.loadingScore = false;
                // Cập nhật councilDetail nếu cần
                if (state.councilDetail) {
                    state.councilDetail.sessions = state.councilDetail.sessions.map((session) => {
                        if (session.assignments) {
                            session.assignments = session.assignments.map((assignment) =>
                                assignment.id === action.payload.id ? action.payload : assignment
                            );
                        }
                        return session;
                    });
                }
            })
            .addCase(createCouncilReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCouncilReview.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(createCouncilReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchReviewCouncilsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewCouncilsList.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Updating councils state with payload:", action.payload);
                state.data = action.payload;
            })
            .addCase(fetchReviewCouncilsList.rejected, (state, action) => {
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
            .addCase(fetchCouncilDetailForMentor.pending, (state) => {
                state.loadingDetail = true;
                state.error = null;
            })
            .addCase(fetchCouncilDetailForMentor.fulfilled, (state, action) => {
                state.loadingDetail = false;
                state.councilDetail = action.payload;
            })
            .addCase(fetchCouncilDetailForMentor.rejected, (state, action) => {
                state.loadingDetail = false;
                state.error = action.payload as string;
            })
            .addCase(updateCouncilReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCouncilReview.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCouncil = action.payload;

                // Kiểm tra updatedCouncil có hợp lệ không
                if (!updatedCouncil || !updatedCouncil.id) {
                    state.error = "Dữ liệu hội đồng cập nhật không hợp lệ";
                    console.error("Updated council is invalid:", updatedCouncil);
                    return;
                }

                // Kiểm tra state.data có phải mảng không
                if (Array.isArray(state.data)) {
                    state.data = state.data.map((council) =>
                        council.id === updatedCouncil.id ? updatedCouncil : council
                    );
                } else {
                    console.warn("state.data is not an array, initializing with updatedCouncil");
                    state.data = [updatedCouncil]; // Khởi tạo nếu state.data chưa là mảng
                }

                // Cập nhật councilDetail nếu cần
                if (state.councilDetail?.id === updatedCouncil.id) {
                    state.councilDetail = updatedCouncil;
                }
            })
            .addCase(updateCouncilReview.rejected, (state, action) => {
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
            .addCase(createReviewSchedule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReviewSchedule.fulfilled, (state) => {
                state.loading = false;
                // Không cần cập nhật state vì không lưu lịch review trong councilDetail
            })
            .addCase(createReviewSchedule.rejected, (state) => {
                state.loading = false;
                // state.error = action.payload as string;
            })
            .addCase(fetchReviewSchedulesForStudent.pending, (state) => {
                state.loadingSchedules = true;
                state.errorSchedules = null;
                state.reviewSchedules = []; // Reset khi bắt đầu fetch
            })
            .addCase(fetchReviewSchedulesForStudent.fulfilled, (state, action) => {
                state.loadingSchedules = false;
                state.reviewSchedules = action.payload; // Gán mảng từ API
            })
            .addCase(fetchReviewSchedulesForStudent.rejected, (state, action) => {
                state.loadingSchedules = false;
                state.errorSchedules = action.payload as string;
                state.reviewSchedules = []; // Đảm bảo mảng rỗng khi lỗi
            })
            .addCase(fetchReviewSchedulesForMentor.pending, (state) => {
                state.loadingSchedulesMentor = true;
                state.errorSchedulesMentor = null;
                state.reviewSchedulesMentor = [];
            })
            .addCase(fetchReviewSchedulesForMentor.fulfilled, (state, action) => {
                state.loadingSchedulesMentor = false;
                state.reviewSchedulesMentor = action.payload;
            })
            .addCase(fetchReviewSchedulesForMentor.rejected, (state, action) => {
                state.loadingSchedulesMentor = false;
                state.errorSchedulesMentor = action.payload as string;
                state.reviewSchedulesMentor = [];
            })
            .addCase(confirmDefenseRound.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(confirmDefenseRound.fulfilled, (state, action) => {
                state.loading = false;
                const { groupCode, defendStatus, defenseRound } = action.payload;
              
                state.reviewSchedulesMentor = state.reviewSchedulesMentor.map(schedule => {
                  if (schedule.schedule.group.groupCode === groupCode) {
                    const updatedTopicAssignments = schedule.schedule.group.topicAssignments.map(ta => ({
                      ...ta,
                      defendStatus,
                      defenseRound: defenseRound !== undefined ? defenseRound : null,
                    }));
              
                    return {
                      ...schedule,
                      schedule: {
                        ...schedule.schedule,
                        group: {
                          ...schedule.schedule.group,
                          topicAssignments: updatedTopicAssignments,
                        },
                      },
                    };
                  }
                  return schedule;
                });
              
                state.reviewSchedulesMentor = [...state.reviewSchedulesMentor]; // đảm bảo tạo array mới
              })
              
            .addCase(confirmDefenseRound.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        ;
    },
});

export const { clearCouncils } = councilReviewSlice.actions;
export default councilReviewSlice.reducer;