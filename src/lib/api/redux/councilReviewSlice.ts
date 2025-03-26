// import { createCouncilReview } from './councilReviewSlice';
// lib/api/redux/councilReviewSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { CouncilReview, CouncilReviewMember, ReviewSchedule } from "../types";

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
};

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
    async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/council-review`, {
                params: { semesterId },
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
export const updateCouncil = createAsyncThunk(
    "councils/updateCouncil",
    async (
        { councilId, updatedData }: { councilId: string; updatedData: Partial<CouncilReview> },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.put(`/council-review/${councilId}`, updatedData);
            console.log("API updateCouncil response:", response.data);
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
            .addCase(updateCouncil.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCouncil.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCouncil = action.payload;
                state.data = state.data.map((council) =>
                    council.id === updatedCouncil.id ? updatedCouncil : council
                );
                if (state.councilDetail?.id === updatedCouncil.id) {
                    state.councilDetail = updatedCouncil;
                }
            })
            .addCase(updateCouncil.rejected, (state, action) => {
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
            });
        ;
    },
});

export const { clearCouncils } = councilReviewSlice.actions;
export default councilReviewSlice.reducer;