import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "@/lib/api/config/axios-client";

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
  
  const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    author: null
  };

export const fetchSubUserById = createAsyncThunk(
    "authSub/fetchSubUserById",
    async ({ userId, semesterId }: { userId: string; semesterId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/users/users/${userId}?semesterId=${semesterId}`);
            return response.data.user;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Không thể lấy thông tin người dùng");
        }
    }
);

const authSubSlice = createSlice({
    name: "authSub",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
      },
      resetSubMentor: (state) => {
        state.author = null; // ✅ Reset author về null khi chuyển topic
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.author = action.payload;
            })
            .addCase(fetchSubUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetSubMentor } = authSubSlice.actions;
export default authSubSlice.reducer;
