// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/lib/api/redux/store";
// import { updateCouncil } from "@/lib/api/redux/councilReviewSlice";
// import { fetchSubmissionRounds } from "@/lib/api/redux/submissionRoundSlice";
// import { CouncilReview } from "@/lib/api/types";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const formSchema = z.object({
//   name: z.string().min(3, "Tên hội đồng phải có ít nhất 3 ký tự"),
//   councilStartDate: z.string().min(10, "Ngày bắt đầu không hợp lệ"),
//   councilEndDate: z.string().min(10, "Ngày kết thúc không hợp lệ"),
//   round: z.number().min(1, "Vòng phải là số nguyên dương"), // Giữ kiểu number cho round
// });

// interface UpdateReviewTopicCouncilProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   council: CouncilReview;
//   refetchData?: () => void;
// }

// export const UpdateReviewTopicCouncil: React.FC<UpdateReviewTopicCouncilProps> = ({
//   open,
//   setOpen,
//   council,
//   refetchData,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Lấy danh sách submissionRounds từ Redux store
//   const { data: submissionRounds, loading: roundsLoading } = useSelector(
//     (state: RootState) => state.submissionRounds
//   );

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: council.name || "",
//       councilStartDate: council.councilStartDate
//         ? new Date(council.councilStartDate).toISOString().split("T")[0]
//         : "",
//       councilEndDate: council.councilEndDate
//         ? new Date(council.councilEndDate).toISOString().split("T")[0]
//         : "",
//       round: council.round || 1,
//     },
//   });

//   // Fetch submissionRounds khi modal mở
//   useEffect(() => {
//     if (open && council.semesterId) {
//       dispatch(fetchSubmissionRounds(council.semesterId));
//     }
//   }, [open, council.semesterId, dispatch]);

//   // Reset form khi modal mở hoặc council thay đổi
//   useEffect(() => {
//     if (open) {
//       form.reset({
//         name: council.name || "",
//         councilStartDate: council.councilStartDate
//           ? new Date(council.councilStartDate).toISOString().split("T")[0]
//           : "",
//         councilEndDate: council.councilEndDate
//           ? new Date(council.councilEndDate).toISOString().split("T")[0]
//           : "",
//         round: council.round || 1,
//       });
//     }
//   }, [open, council, form]);

//   const onSubmit = async (data: any) => {
//     console.log("Submitting data:", data); // Debug
//     if (new Date(data.councilEndDate) <= new Date(data.councilStartDate)) {
//       toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
//       return;
//     }

//     const formattedData = {
//       name: data.name,
//       semesterId: council.semesterId, // Giữ nguyên từ council
//       submissionPeriodId: council.submissionPeriodId, // Giữ nguyên từ council
//       startDate: new Date(data.councilStartDate).toISOString().split("T")[0] + "T00:00:00Z", // Định dạng đúng
//       endDate: new Date(data.councilEndDate).toISOString().split("T")[0] + "T00:00:00Z", // Định dạng đúng
//       round: Number(data.round), // Đảm bảo là số
//     };

//     console.log("Formatted data to submit:", formattedData); // Debug

//     setIsLoading(true);
//     try {
//       await dispatch(
//         updateCouncil({ councilId: council.id, updatedData: formattedData })
//       ).unwrap();
//       toast.success("Cập nhật hội đồng thành công!");
//       if (refetchData) {
//         console.log("Triggering refetch"); // Debug
//         refetchData();
//       }
//       setOpen(false);
//     } catch (error) {
//       console.error("Update failed:", error); // Debug
//       toast.error("Cập nhật thất bại!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!open) return null;

//   const availableRounds = submissionRounds.filter((r) => !r.isDeleted);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-bold">Cập nhật hội đồng</h2>
//           <button
//             onClick={() => setOpen(false)}
//             className="text-gray-500 hover:text-gray-800"
//             disabled={isLoading}
//           >
//             ✖
//           </button>
//         </div>
//         <p className="text-gray-500 text-sm mb-4">
//           Nhập thông tin hội đồng bên dưới. Nhấn "Lưu" để xác nhận.
//         </p>

//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Tên hội đồng</label>
//             <input
//               type="text"
//               {...form.register("name")}
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={isLoading}
//             />
//             {form.formState.errors.name && (
//               <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
//             <input
//               type="date"
//               {...form.register("councilStartDate")}
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={isLoading}
//             />
//             {form.formState.errors.councilStartDate && (
//               <p className="text-red-500 text-sm mt-1">{form.formState.errors.councilStartDate.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
//             <input
//               type="date"
//               {...form.register("councilEndDate")}
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={isLoading}
//             />
//             {form.formState.errors.councilEndDate && (
//               <p className="text-red-500 text-sm mt-1">{form.formState.errors.councilEndDate.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Vòng</label>
//             <Select
//               onValueChange={(value) => form.setValue("round", Number(value))} // Chuyển thành number
//               value={form.watch("round")?.toString()} // Chuyển number thành string để hiển thị
//               disabled={isLoading || roundsLoading}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder={roundsLoading ? "Đang tải..." : "Chọn vòng"} />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {availableRounds.length > 0 ? (
//                     availableRounds.map((round) => (
//                       <SelectItem key={round.id} value={round.roundNumber.toString()}>
//                         {round.description} (Vòng {round.roundNumber})
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <SelectItem value="none" disabled>
//                       Không có vòng nào
//                     </SelectItem>
//                   )}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             {form.formState.errors.round && (
//               <p className="text-red-500 text-sm mt-1">{form.formState.errors.round.message}</p>
//             )}
//           </div>

//           <div className="mt-6 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={() => setOpen(false)}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
//               disabled={isLoading}
//             >
//               Hủy
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-black text-white rounded-lg"
//               disabled={isLoading}
//             >
//               {isLoading ? "Đang lưu..." : "Lưu cập nhật"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };