// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/api/redux/store";
// import { updateTopic, fetchTopicDetail } from "@/lib/api/redux/topicSlice";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";

// export const UpdateTopic: React.FC<{ topicId: string }> = ({ topicId }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { topicDetails, loading } = useSelector((state: RootState) => state.topics);
//   const [open, setOpen] = useState(false);
//   const [nameVi, setNameVi] = useState("");
//   const [nameEn, setNameEn] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     if (topicId) {
//       dispatch(fetchTopicDetail(topicId));
//     }
//   }, [dispatch, topicId]);

//   useEffect(() => {
//     if (topicDetails) {
//       setNameVi(topicDetails.nameVi);
//       setNameEn(topicDetails.nameEn);
//       setDescription(topicDetails.description);
//     }
//   }, [topicDetails]);

//   const handleUpdateTopic = async () => {
//     if (!nameVi || !nameEn || !description) {
//       toast.error("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     try {
//       await dispatch(
//         updateTopic({
//           topicId,
//           updatedData: {
//             nameVi,
//             nameEn,
//             description,
//           },
//         })
//       ).unwrap();

//       toast.success("Cập nhật đề tài thành công!");
//       setOpen(false);
//     } catch (error: any) {
//       toast.error(error?.message || "Cập nhật đề tài thất bại!");
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">Cập nhật</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Cập nhật Đề Tài</AlertDialogTitle>
//           <AlertDialogDescription>Chỉnh sửa thông tin đề tài.</AlertDialogDescription>
//         </AlertDialogHeader>

//         <div className="space-y-3">
//           <Input value={nameVi} onChange={(e) => setNameVi(e.target.value)} placeholder="Tên đề tài (Tiếng Việt)" />
//           <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Tên đề tài (Tiếng Anh)" />
//           <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả đề tài" />
//         </div>

//         <AlertDialogFooter>
//           <AlertDialogCancel>Hủy</AlertDialogCancel>
//           <AlertDialogAction asChild>
//             <Button onClick={handleUpdateTopic} disabled={loading}>
//               {loading ? "Đang cập nhật..." : "Cập nhật"}
//             </Button>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
