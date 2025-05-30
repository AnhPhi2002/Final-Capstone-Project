import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../config/axios-client";
import { User } from "./types/user";

interface UserState {
  users: User[];
  filteredUsers: User[];
  userDetail: User | null;
  loading: boolean;
  error: string | null;
}

interface CreateUserPayload {
  email: string;
  password: string;
  username: string;
  fullName: string;
  roles: string[];
}

interface UpdateUserPayload {
  userId: string;
  email: string;
  username: string;
  fullName: string;
}

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

interface UpdateUserRolesPayload {
  userId: string;
  roles: string[];
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/admin/users`, {
        params: { semesterId },
      });
      return response.data.users as User[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const fetchUserDetail = createAsyncThunk(
  "users/fetchUserDetail",
  async (userId: string) => {
    const response = await axiosClient.get(`/admin/users/${userId}`);
    return response.data.user as User;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload: CreateUserPayload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/admin/users", payload);
      return response.data.user as User;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const { userId, ...updateData } = payload;
      const response = await axiosClient.put(
        `/admin/users/${userId}`,
        updateData
      );
      return response.data.user as User;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const updateUserRoles = createAsyncThunk(
  "users/updateUserRoles",
  async (payload: UpdateUserRolesPayload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put("/admin/users/roles", payload);
      return response.data.user as User;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user roles"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (
    { userId, semesterId }: { userId: string; semesterId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/admin/users/${userId}/delete`, {
        semesterId,
      });
      return response.data; // Return full response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const deleteAll = createAsyncThunk(
  "users/deleteAll",
  async ({ semesterId }: { semesterId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/admin/delete-all`, {
        semesterId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put("/users/change-password", payload);
      return response.data.message as string; // server trả về { message: "Thành công" }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thay đổi mật khẩu thất bại"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    userDetail: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    filterUsers: (
      state,
      action: PayloadAction<{ search: string; role: string }>
    ) => {
      const { search, role } = action.payload;
      let filtered = state.users;

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            user.email.toLowerCase().includes(searchLower) ||
            (user.fullName && user.fullName.toLowerCase().includes(searchLower))
        );
      }

      if (role && role !== "*") {
        filtered = filtered.filter((user) => {
          const roleDescription =
            user.roles[0]?.role?.description || "Không xác định";
          if (role === "student")
            return roleDescription === "Sinh viên (Student Groups/Students)";
          if (role === "lecturer") return roleDescription === "Giảng viên";
          if (role === "staff")
            return (
              roleDescription === "Không xác định" || user.roles.length === 0
            );
          return true;
        });
      }

      state.filteredUsers = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user detail";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.filteredUsers.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.filteredUsers = state.filteredUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        if (state.userDetail && state.userDetail.id === updatedUser.id) {
          state.userDetail = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.filteredUsers = state.filteredUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        if (state.userDetail && state.userDetail.id === updatedUser.id) {
          state.userDetail = updatedUser;
        }
      })
      .addCase(updateUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.payload;
        state.users = state.users.filter((user) => user.id !== userId);
        state.filteredUsers = state.filteredUsers.filter(
          (user) => user.id !== userId
        );
        if (state.userDetail && state.userDetail.id === userId) {
          state.userDetail = null;
        }
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(deleteAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAll.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.payload;
        state.users = state.users.filter((user) => user.id !== userId);
        state.filteredUsers = state.filteredUsers.filter(
          (user) => user.id !== userId
        );
        if (state.userDetail && state.userDetail.id === userId) {
          state.userDetail = null;
        }
      })
      .addCase(deleteAll.rejected, (state) => {
        state.loading = false;
        // state.error = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { filterUsers } = userSlice.actions;
export default userSlice.reducer;
