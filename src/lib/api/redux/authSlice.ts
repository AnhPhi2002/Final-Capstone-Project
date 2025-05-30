// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";

// ==== Type Definitions ====
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
  author: User | null;
  currentRole: string | null;
}

// ==== Initial State ====
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  author: null,
  currentRole: localStorage.getItem("currentRole") || null,
};

// ==== Thunks ====
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/users/profile");
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể lấy thông tin người dùng"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post("/users/login", credentials);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      await axiosClient.post("/users/logout", { refreshToken });
      return true;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Đăng xuất thất bại"
      );
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (idToken: string, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/users/google-login", { idToken });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Đăng nhập Google thất bại"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put("/users/profile", updatedData);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể cập nhật thông tin"
      );
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async (
    { userId, semesterId }: { userId: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.get(
        `/users/users/${userId}?semesterId=${semesterId}`
      );
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Không thể lấy thông tin người dùng"
      );
    }
  }
);
// Thunk gửi OTP
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/users/forgot-password", { email });
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Gửi OTP thất bại");
    }
  }
);

// Thunk đặt lại mật khẩu
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    {
      email,
      otp,
      newPassword,
    }: { email: string; otp: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post("/users/reset-password", {
        email,
        otp,
        newPassword,
      });
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Đặt lại mật khẩu thất bại"
      );
    }
  }
);

// ==== Slice ====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMainMentor: (state: AuthState) => {
      state.author = null;
    },
    setCurrentRole: (state: AuthState, action: PayloadAction<string>) => {
      state.currentRole = action.payload;
      localStorage.setItem("currentRole", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH PROFILE ===
      .addCase(fetchUserProfile.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state: AuthState, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // === LOGIN ===
      .addCase(loginUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state: AuthState,
          action: PayloadAction<{
            accessToken: string;
            refreshToken: string;
            user: User;
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.currentRole = action.payload.user.roles[0]?.name || null;
          localStorage.setItem("currentRole", state.currentRole || "");
          localStorage.setItem("token", action.payload.accessToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      )
      .addCase(loginUser.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // === LOGOUT ===
      .addCase(logoutUser.fulfilled, (state: AuthState) => {
        state.user = null;
        state.token = null;
        state.currentRole = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentRole");
      })
      .addCase(logoutUser.rejected, (state: AuthState, action) => {
        state.error = action.payload as string;
      })

      // === LOGIN GOOGLE ===
      .addCase(loginWithGoogle.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginWithGoogle.fulfilled,
        (
          state: AuthState,
          action: PayloadAction<{
            accessToken: string;
            refreshToken: string;
            user: User;
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.currentRole = action.payload.user.roles[0]?.name || null;
          localStorage.setItem("token", action.payload.accessToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          localStorage.setItem("currentRole", state.currentRole || "");
        }
      )
      .addCase(loginWithGoogle.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // === UPDATE PROFILE ===
      .addCase(
        updateUserProfile.fulfilled,
        (state: AuthState, action: PayloadAction<User>) => {
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(updateUserProfile.rejected, (state: AuthState, action) => {
        state.error = action.payload as string;
      })

      // === GET USER BY ID ===
      .addCase(fetchUserById.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state: AuthState, action: PayloadAction<User>) => {
          state.loading = false;
          state.author = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /// === FORGOT PASSWORD ===
      .addCase(forgotPassword.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state: AuthState) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(resetPassword.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state: AuthState) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMainMentor, setCurrentRole } = authSlice.actions;
export default authSlice.reducer;
