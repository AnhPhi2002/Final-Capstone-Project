import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../config/axios-client";
import { ApproveTopic } from "../types";

interface User {
  id: string;
  fullName: string | null;
  email: string;
}

interface TopicRegistration {
  id: string;
  status: string;
  registeredAt: string;
  userId: string;
  topicId: string;
  user: User;
  group: { id: string; groupCode: string } | null;
}

interface Topic {
  id: string;
  nameVi: string;
  nameEn: string;
  name: string;
  groupCode?: string;
  description: string;
  isBusiness: boolean;
  businessPartner: string | null;
  source: string | null;
  semesterId: string | undefined;
  majorId: string;
  createdBy: string | null;
  status: string;
  reasons: string;
  reviewReason: string | null;
  subSupervisorEmail: string | null;
  creator?: {
    fullName: string;
    email: string;
    createdAt?: string;
  };
  draftFileUrl: string | null | undefined;
  group?: {
    "id": string;
    "groupCode": string;
  };
  createdAt: string;
  topicRegistrations: TopicRegistration[];
  subMentor?: {
    fullName: string;
    email: string;
  };
  documents?: [
    {
      fileName: string;
      fileUrl: string;
      fileType: string;
    },
  ];
}

// Fetch danh sách topic theo semesterId
export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (
    { semesterId, majorId }: { semesterId: string; majorId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(`/topics/semester/${semesterId}?semesterId=${semesterId}`, {
        params: { majorId }, // Thêm `majorId` vào params nếu có
      });
      return response.data.data as Topic[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const exportTopicsToExcel = createAsyncThunk(
  "topics/exportExcel",
  async ({submissionPeriodId, semesterId}:{submissionPeriodId:string, semesterId: string}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/export-topic`,{
          params: {submissionPeriodId, semesterId},
          responseType: "blob"
        },
      );

      // Xử lý tải file về máy
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Danh_sach_de_tai_${submissionPeriodId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return true; // Thành công
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Xuất danh sách thất bại!"
      );
    }
  }
);

// Fetch chi tiết topic theo topicId
export const fetchTopicDetail = createAsyncThunk(
  "topics/fetchTopicDetail",
  async ({ topicId, semesterId }: { topicId: string, semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/${topicId}`, {
        params: { semesterId }, // Thêm `semesterId` vào params
      });
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tải chi tiết đề tài."
      );
    }
  }
);

// Create new topic
export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (newTopic: Partial<Topic>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/topics`, newTopic);
      return response.data.data as Topic;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể tạo đề tài."
      );
    }
  }
);

export const deleteTopic = createAsyncThunk(
  "topics/deleteTopic",
  async ({ topicId, semesterId }: { topicId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      console.log("🟢 Gửi API xóa đề tài:", { topicId, semesterId });
  await axiosClient.delete(`/topics/${topicId}`, {
        params: { semesterId }, // ✅ Truyền semesterId qua params
      });

      // toast.success("Xóa đề tài thành công!");
      return topicId; // ✅ Trả về topicId để cập nhật state
    } catch (error: any) {
      // toast.error(error.response?.data?.message || "Không thể xóa đề tài!");
      return rejectWithValue(error.response?.data?.message || "Lỗi hệ thống!");
    }
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async (
    { topicId, updatedData, semesterId }: { topicId: string; updatedData: Partial<Topic>; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("📡 Gửi API cập nhật đề tài:", { topicId, updatedData, semesterId });

      const response = await axiosClient.put(
        `/topics/${topicId}`,
        { ...updatedData, semesterId } 
      );

      console.log("✅ API Response:", response.data);
      return response.data.data as Topic;
    } catch (error: any) {
      console.error("❌ API Error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật đề tài.");
    }
  }
);


export const fetchApprovalTopics = createAsyncThunk(
  "topics/fetchApprovalTopics",
  async ({ semesterId, round }: { semesterId: string; round: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/approval`, {
        params: { semesterId, round },
      });
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return rejectWithValue("Không có đề tài nào trong vòng này.");
      }
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách đề tài cần duyệt.");
    }
  }
);

export const updateTopicStatus = createAsyncThunk(
  "topics/updateTopicStatus",
  async ({ topicId, updatedData}: { topicId: string; updatedData: { status: string; reasons: string }}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/topics/${topicId}/status`, updatedData); // ✅ Đảm bảo topicId đúng
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật trạng thái.");
    }
  }
);

export const fetchRegisteredTopics = createAsyncThunk(
  "topics/fetchRegisteredTopics",
  async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/registered-topics`, {
        params: { semesterId },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách đề tài.");
    }
  }
);

export const fetchTopicRegistrations = createAsyncThunk(
  "topics/fetchTopicRegistrations",
  async ({ topicId, semesterId }: { topicId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/topics/topic/${topicId}/registrations`, {
        params: { semesterId },
      });

      return response.data.data as ApproveTopic[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách đăng ký.");
    }
  }
);

export const updateTopicRegistrationStatus = createAsyncThunk(
  "topics/updateTopicRegistrationStatus",
  async ({ registrationId, status, semesterId }: { registrationId: string; status: "APPROVED" | "REJECTED" ; semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/topics/topic-registrations/${registrationId}/approve`, {
        status,
        semesterId, 
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật trạng thái.");
    }
  }
);

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    topicRegistrations: [] as ApproveTopic[],
    registeredTopics: [] as Topic[],
    data: [] as Topic[],
    topicDetails: null as Topic | null,
    approvalTopics: [] as Topic[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // ✅ Reset danh sách topic khi round thay đổi
    resetApprovalTopics: (state) => {
      state.approvalTopics = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopics.fulfilled,
        (state, action: PayloadAction<Topic[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopicDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopicDetail.fulfilled,
        (state, action: PayloadAction<Topic>) => {
          state.topicDetails = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTopicDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.loading = false;
        state.data.unshift(action.payload);
        const newTopic = action.payload;

        if (!newTopic.creator) {
          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          newTopic.creator = {

            fullName: currentUser.fullName,
            email: currentUser.email,
          };
        }
        state.data.unshift(newTopic);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTopic.pending, (state) => {

        state.loading = true;
      })
      .addCase(updateTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.loading = false;
        state.topicDetails = action.payload;
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApprovalTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovalTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.approvalTopics = action.payload.map((approvalTopic: Topic) => {
          const matchingTopic = state.data.find((t) => t.id === approvalTopic.id);
          return {
            ...approvalTopic,
            creator: matchingTopic?.creator || approvalTopic.creator,
          };
        });
      })
      .addCase(fetchApprovalTopics.rejected, (state, action) => {
        state.loading = false;
        state.approvalTopics = []; // ✅ Xóa danh sách cũ khi có lỗi
        state.error = action.payload as string;
      })
      .addCase(updateTopicStatus.fulfilled, (state, action) => {
        if (state.topicDetails) {
          state.topicDetails = { ...state.topicDetails, ...action.payload }; // ✅ Cập nhật dữ liệu mới ngay lập tức
        }
        state.loading = false;
      })
      .addCase(fetchRegisteredTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisteredTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredTopics = action.payload;
      })
      .addCase(fetchRegisteredTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopicRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicRegistrations.fulfilled, (state, action: PayloadAction<ApproveTopic[]>) => {
        state.loading = false;
        state.topicRegistrations = action.payload;
      })
      .addCase(fetchTopicRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTopicRegistrationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopicRegistrationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { registrationId, status } = action.payload;
        state.registeredTopics = state.registeredTopics.map((topic: any) =>
          topic.registrationId === registrationId ? { ...topic, registrationStatus: status } : topic
        );
      })
      .addCase(updateTopicRegistrationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTopic.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.data = state.data.filter((topic: any) => topic.id !== action.payload);
        state.topicDetails = null; // ✅ Xóa khỏi chi tiết nếu đang xem
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});
export const { resetApprovalTopics } = topicSlice.actions;
export default topicSlice.reducer;
