import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";
import { toast } from "sonner";

// 📌 Lấy tất cả templates
export const fetchEmailTemplates = createAsyncThunk(
  "emailTemplates/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/templates");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải danh sách templates");
    }
  }
);

// 📌 Lấy chi tiết template theo ID
export const fetchEmailTemplateById = createAsyncThunk(
  "emailTemplates/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/templates/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể tải chi tiết template");
    }
  }
);

// 📌 Cập nhật template
export const updateEmailTemplate = createAsyncThunk(
  "emailTemplates/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      await axiosClient.put(`/templates/${id}`, data);
      toast.success("Cập nhật template thành công!");
      return { id, data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Cập nhật thất bại");
    }
  }
);

// 📌 Xóa template
export const deleteEmailTemplate = createAsyncThunk(
  "emailTemplates/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/templates/${id}`);
      toast.success("Xóa template thành công!");
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Xóa template thất bại");
    }
  }
);

// 📌 Tạo template mới
export const createEmailTemplate = createAsyncThunk(
  "emailTemplates/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/templates", data);
      toast.success("Tạo template mới thành công!");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Tạo template thất bại");
    }
  }
);


// 📌 Slice
const emailTemplateSlice = createSlice({
  name: "emailTemplates",
  initialState: {
    templates: [] as any[],
    selectedTemplate: null as any | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmailTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchEmailTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEmailTemplateById.fulfilled, (state, action) => {
        state.selectedTemplate = action.payload;
      })
      .addCase(updateEmailTemplate.fulfilled, (state, action) => {
        state.templates = state.templates.map((t) =>
          t.id === action.payload.id ? action.payload.data : t
        );
        if (state.selectedTemplate?.id === action.payload.id) {
          state.selectedTemplate = action.payload.data;
        }
      })
      .addCase(deleteEmailTemplate.fulfilled, (state, action) => {
        state.templates = state.templates.filter((t) => t.id !== action.payload);
        state.selectedTemplate = null;
      })
      .addCase(createEmailTemplate.fulfilled, (state, action) => {
        state.templates.push(action.payload);
      });
  },
});

export default emailTemplateSlice.reducer;
