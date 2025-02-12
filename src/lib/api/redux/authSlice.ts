import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// **Trạng thái ban đầu**
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// **Đăng nhập bằng Email/Mật khẩu**
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
);

// **Đăng nhập bằng Google**
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (googleToken: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/google-login", { idToken: googleToken });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đăng nhập Google thất bại");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
