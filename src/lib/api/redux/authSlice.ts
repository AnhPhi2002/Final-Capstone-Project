import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
}

// ==== Initial State ====
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  author: null,
};

// ==== Thunks ====

// Lấy profile người dùng
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get("/users/profile");
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Không thể lấy thông tin người dùng");
    }
  }
);

// Đăng nhập
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/users/login", credentials);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Đăng nhập thất bại");
    }
  }
);

// Đăng xuất (API)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      await axiosClient.post("/users/logout", { refreshToken });
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Đăng xuất thất bại");
    }
  }
);

// Đăng nhập bằng Google
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (idToken: string, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/users/google-login", { idToken });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Đăng nhập Google thất bại");
    }
  }
);

// Cập nhật hồ sơ người dùng
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put("/users/profile", updatedData);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Không thể cập nhật thông tin");
    }
  }
);

// Lấy người dùng theo ID
export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async ({ userId, semesterId }: { userId: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/users/users/${userId}?semesterId=${semesterId}`);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Không thể lấy thông tin người dùng");
    }
  }
);

// ==== Slice ====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMainMentor: (state) => {
      state.author = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH PROFILE ===
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

      // === LOGIN ===
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
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // === LOGOUT ===
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken"); 
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // === LOGIN GOOGLE ===
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
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // === UPDATE PROFILE ===
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // === GET USER BY ID ===
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.author = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMainMentor } = authSlice.actions;
export default authSlice.reducer;
