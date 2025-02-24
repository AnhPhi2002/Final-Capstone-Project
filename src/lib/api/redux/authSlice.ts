import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

interface Role {
  id: string;
  name: string;
  isActive: boolean;
}

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar: string | null;
  roles: Role[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// ** Đăng nhập bằng Email/Mật khẩu **
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users/login", credentials);
      return response.data; // ✅ Trả về toàn bộ dữ liệu
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
);

// ** Đăng nhập bằng Google **
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
      localStorage.removeItem("user"); // ✅ Xóa user khỏi localStorage khi logout
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
        state.user = action.payload.user; // ✅ Lưu user vào Redux store

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("roles", JSON.stringify(action.payload.user.roles.map((role: { name: string }) => role.name)));
    
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
        state.user = action.payload.user; // ✅ Lưu user vào Redux store

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // ✅ Lưu user vào localStorage
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
