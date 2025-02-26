// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosClient } from "../config/axios-client";

// interface UserProfile {
//   id: string;
//   email: string;
//   username: string;
//   fullName: string;
//   avatar: string | null;
//   gender: string | null;
//   phone: string | null;
//   personal_Email?: string | null;
//   profession: string | null;
//   specialty: string | null;
//   programming_language: string | null;
//   updatedAt: string;
// }

// interface ProfileState {
//   user: UserProfile | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProfileState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// export const fetchUserProfile = createAsyncThunk(
//   "profile/fetchUserProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.get("/users/profile");
//       console.log("Fetched user:", response.data.user);
//       return response.data.user;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Không thể lấy thông tin người dùng");
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default profileSlice.reducer;
