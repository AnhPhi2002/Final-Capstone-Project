// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosClient } from "../config/axios-client";

// // Định nghĩa kiểu dữ liệu cho nhóm
// interface GroupStudent {
//   id: string;
//   groupCode: string;
//   semesterId: string;
//   status: string;
//   isAutoCreated: boolean;
//   createdBy: string;
//   maxMembers: number;
//   isMultiMajor: boolean;
//   createdAt: string;
//   updatedAt: string;
//   mentor1Id: string | null;
//   mentor2Id: string | null;
//   topicEnglish: string | null;
//   topicTiengViet: string | null;
//   members: {
//     id: string;
//     groupId: string;
//     studentId: string;
//     role: string;
//     joinedAt: string;
//     leaveAt: string | null;
//     leaveReason: string | null;
//     isActive: boolean;
//     status: string;
//     student: {
//       id: string;
//       userId: string;
//       studentCode: string;
//       majorId: string;
//       specializationId: string;
//       isEligible: boolean;
//       personalEmail: string | null;
//       status: string;
//       importAt: string;
//       importSource: string;
//       isImported: boolean;
//       user: {
//         id: string;
//         username: string;
//         email: string;
//         fullName: string | null;
//         profession: string;
//         specialty: string;
//         programming_language: string;
//       };
//     };
//   }[];
// }

// // Tạo AsyncThunk để fetch danh sách nhóm theo semesterId
// export const fetchGroupStudents = createAsyncThunk(
//   "groupStudents/fetch",
//   async (semesterId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.get(`/groups/semester?semesterId=${semesterId}`);
//       return response.data.groups; // Trả về danh sách nhóm
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy danh sách nhóm!");
//     }
//   }
// );

// const groupStudentSlice = createSlice({
//   name: "groupStudents",
//   initialState: {
//     groups: [] as GroupStudent[],
//     loading: false,
//     error: null as string | null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGroupStudents.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchGroupStudents.fulfilled, (state, action) => {
//         state.loading = false;
//         state.groups = action.payload;
//       })
//       .addCase(fetchGroupStudents.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const groupStudentReducer = groupStudentSlice.reducer;
