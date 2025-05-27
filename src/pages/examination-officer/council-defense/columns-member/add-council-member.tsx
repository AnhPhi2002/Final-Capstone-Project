// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/lib/api/redux/store";
// import { addCouncilMember, fetchCouncilDetail } from "@/lib/api/redux/councilDefenseSlice";
// import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Mentor } from "@/lib/api/types";

// // Định nghĩa schema
// const formSchema = z.object({
//   members: z
//     .array(
//       z.object({
//         email: z.string().email("Email không hợp lệ").min(1, "Vui lòng chọn email"),
//         role: z.enum(["council_chairman", "council_secretary", "council_member"], {
//           required_error: "Vui lòng chọn vai trò",
//         }),
//       })
//     )
//     .min(1, "Vui lòng chọn ít nhất một mentor")
//     .max(5, "Chỉ được chọn tối đa 5 mentor"),
// });

// // Định nghĩa kiểu dữ liệu cho form
// type FormData = z.infer<typeof formSchema>;

// interface AddMemberReviewCouncilProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   councilId: string;
//   semesterId: string;
// }

// export const AddMemberDefenseCouncil: React.FC<AddMemberReviewCouncilProps> = ({
//   open,
//   setOpen,
//   councilId,
//   semesterId,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { mentors, loading: mentorLoading } = useSelector((state: RootState) => state.mentors);
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       members: [],
//     },
//   });

//   useEffect(() => {
//     if (open && semesterId) {
//       dispatch(fetchMentorsBySemesterId(semesterId));
//     }
//   }, [open, semesterId, dispatch]);

//   // Xử lý chọn/bỏ chọn mentor
//   const handleSelectMentor = (email: string, currentMembers: FormData["members"]) => {
//     if (currentMembers.some((member) => member.email === email)) {
//       // Bỏ chọn mentor
//       const updatedMembers = currentMembers.filter((member) => member.email !== email);
//       form.setValue("members", updatedMembers, { shouldValidate: true });
//     } else {
//       // Thêm mentor mới với vai trò mặc định
//       if (currentMembers.length >= 5) {
//         toast.error("Chỉ được chọn tối đa 5 mentor!");
//         return;
//       }
//       const updatedMembers = [...currentMembers, { email, role: "council_member" as const }];
//       form.setValue("members", updatedMembers, { shouldValidate: true });
//     }
//   };

//   // Xử lý thay đổi vai trò của mentor
//   const handleRoleChange = (index: number, role: "council_chairman" | "council_secretary" | "council_member") => {
//     const currentMembers = form.getValues("members");
//     const updatedMembers = [...currentMembers];
//     updatedMembers[index] = { ...updatedMembers[index], role };
//     form.setValue("members", updatedMembers, { shouldValidate: true });
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     setIsLoading(true);
//     try {
//       // Gửi từng thành viên đến addCouncilMember
//       for (const member of data.members) {
//         await dispatch(
//           addCouncilMember({ councilId, email: member.email, role: member.role })
//         ).unwrap();
//       }
//       toast.success(`Thêm ${data.members.length} thành viên thành công!`);
//       dispatch(fetchCouncilDetail(councilId));
//       setOpen(false);
//       form.reset();
//     } catch (error) {
//       toast.error((error as string) || "Thêm thành viên thất bại!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-bold">Thêm thành viên hội đồng</h2>
//           <button
//             onClick={() => setOpen(false)}
//             className="text-gray-500 hover:text-gray-800"
//             disabled={isLoading || mentorLoading}
//           >
//             ✖
//           </button>
//         </div>
//         <p className="text-gray-500 text-sm mb-4">
//           Chọn tối đa 5 mentor và gán vai trò cho họ.
//         </p>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             {/* Chọn mentor */}
//             <FormField
//               control={form.control}
//               name="members"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email mentor</FormLabel>
//                   <FormControl>
//                     <div className="space-y-2">
//                       <Select
//                         onValueChange={(value) => handleSelectMentor(value, field.value)}
//                         disabled={isLoading || mentorLoading}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue
//                             placeholder={
//                               mentorLoading
//                                 ? "Đang tải danh sách mentor..."
//                                 : "Chọn mentor (tối đa 5)"
//                             }
//                           />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {mentors?.length ? (
//                             mentors.map((mentor: Mentor) => (
//                               <SelectItem key={mentor.id} value={mentor.email}>
//                                 {mentor.fullName} ({mentor.email})
//                                 {field.value.some((m) => m.email === mentor.email) && " ✓"}
//                               </SelectItem>
//                             ))
//                           ) : (
//                             <SelectItem value="none" disabled>
//                               Không có mentor nào
//                             </SelectItem>
//                           )}
//                         </SelectContent>
//                       </Select>
//                       {/* Hiển thị danh sách mentor đã chọn và vai trò */}
//                       {field.value.length > 0 && (
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-600">Mentor đã chọn:</p>
//                           {field.value.map((member, index) => (
//                             <div
//                               key={member.email}
//                               className="flex items-center justify-between gap-2"
//                             >
//                               <span className="text-sm">
//                                 {mentors.find((m: Mentor) => m.email === member.email)?.fullName} (
//                                 <br/>{member.email})
//                               </span>
//                               <Select
//                                 value={member.role}
//                                 onValueChange={(value) =>
//                                   handleRoleChange(
//                                     index,
//                                     value as "council_chairman" | "council_secretary" | "council_member"
//                                   )
//                                 }
//                                 disabled={isLoading || mentorLoading}
//                               >
//                                 <SelectTrigger className="w-40">
//                                   <SelectValue placeholder="Chọn vai trò" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="council_chairman">Chủ tịch hội đồng</SelectItem>
//                                   <SelectItem value="council_secretary">Thư ký hội đồng</SelectItem>
//                                   <SelectItem value="council_member">Thành viên</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="mt-6 flex justify-end space-x-4">
//               <Button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 variant="outline"
//                 disabled={isLoading || mentorLoading}
//               >
//                 Hủy
//               </Button>
//               <Button type="submit" disabled={isLoading || mentorLoading}>
//                 {isLoading ? "Đang thêm..." : "Thêm thành viên"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };