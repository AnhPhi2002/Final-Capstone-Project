import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';

interface UploadedDecisionFile {
  fileUrl: string;
  fileName: string;
}

interface UploadDecisionState {
  draftFile: UploadedDecisionFile | null; // Lưu file cho DRAFT
  finalFile: UploadedDecisionFile | null; // Lưu file cho FINAL
  loading: boolean;
  error: string | null;
}

const initialState: UploadDecisionState = {
  draftFile: null,
  finalFile: null,
  loading: false,
  error: null,
};

// 🔹 API upload file cho quyết định
export const uploadDecisionFile = createAsyncThunk(
  'uploadDecision/uploadDecisionFile', // Đổi tên action
  async ({ file, type }: { file: File; type: 'DRAFT' | 'FINAL' }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosClient.post(`/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileUrl, fileName } = response.data.data;
      if (!fileUrl) {
        throw new Error('Không tìm thấy fileUrl trong response');
      }

      return { fileUrl, fileName, type };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải file lên!');
    }
  }
);

const uploadDecisionSlice = createSlice({
  name: 'uploadDecision', // Đổi tên slice
  initialState,
  reducers: {
    resetUploadDecision: (state) => {
      state.draftFile = null;
      state.finalFile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDecisionFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDecisionFile.fulfilled, (state, action) => {
        state.loading = false;
        const { fileUrl, fileName, type } = action.payload;
        const uploadedFile = { fileUrl, fileName };
        if (type === 'DRAFT') {
          state.draftFile = uploadedFile;
        } else if (type === 'FINAL') {
          state.finalFile = uploadedFile;
        }
      })
      .addCase(uploadDecisionFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUploadDecision } = uploadDecisionSlice.actions;
export default uploadDecisionSlice.reducer;