import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface UploadState {
  fileUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  fileUrl: null,
  loading: false,
  error: null,
};

// 🔹 API upload file
export const uploadFile = createAsyncThunk(
  "upload/uploadFile",
  async (file: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosClient.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Giả sử response trả về dạng { success: true, data: { fileUrl: "..." } }
      return response.data.data.fileUrl; // Trả về fileUrl từ API
    } catch (error: any) {
      // Xử lý lỗi từ server
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải file lên!"
      );
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUpload: (state) => {
      state.fileUrl = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.fileUrl = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;