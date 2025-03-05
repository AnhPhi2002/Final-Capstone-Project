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
  gender?: string | null;
  phone?: string | null;
  personal_Email?: string | null;
  profession?: string | null;
  specialty?: string | null;
  programming_language?: string | null;
  updatedAt?: string;
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

// ** Lấy thông tin hồ sơ người dùng **
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/users/profile");
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể lấy thông tin người dùng");
    }
  }
);

// ** Đăng nhập bằng Email/Mật khẩu **
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

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put("/users/profile", updatedData);
      return response.data.user; // Giả sử API trả về user đã cập nhật
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Không thể cập nhật thông tin");
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
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        // window.location.reload(); // Reload để React Router nhận token mới
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
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // .addCase(fetchUserProfile.fulfilled, (state, action) => {
      //   state.user = action.payload;
      // })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Lưu lại user sau khi update
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
