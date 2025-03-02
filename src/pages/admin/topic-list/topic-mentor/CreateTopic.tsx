// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/lib/api/redux/store";
// import { createTopic } from "@/lib/api/redux/topicSlice";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";

// export const CreateTopic: React.FC<{ semesterId: string }> = ({ semesterId }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [open, setOpen] = useState(false);
//   const [nameVi, setNameVi] = useState("");
//   const [nameEn, setNameEn] = useState("");
//   const [description, setDescription] = useState("");

//   const handleCreateTopic = async () => {
//     if (!nameVi || !nameEn || !description) {
//       toast.error("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     try {
//       await dispatch(
//         createTopic({
//           nameVi,
//           nameEn,
//           description,
//           semesterId,
//           isBusiness: false,
//           businessPartner: null,
//           source: "Tự đề xuất",
//           documents: [],
//         })
//       ).unwrap();

//       toast.success("Đề tài đã được tạo thành công!");
//       setOpen(false);
//     } catch (error: any) {
//       toast.error(error?.message || "Tạo đề tài thất bại!");
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button>Tạo Đề Tài</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Tạo Đề Tài Mới</AlertDialogTitle>
//           <AlertDialogDescription>Nhập thông tin đề tài mới.</AlertDialogDescription>
//         </AlertDialogHeader>

//         <div className="space-y-3">
//           <Input value={nameVi} onChange={(e) => setNameVi(e.target.value)} placeholder="Tên đề tài (Tiếng Việt)" />
//           <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Tên đề tài (Tiếng Anh)" />
//           <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả đề tài" />
//         </div>

//         <AlertDialogFooter>
//           <AlertDialogCancel>Hủy</AlertDialogCancel>
//           <AlertDialogAction asChild>
//             <Button onClick={handleCreateTopic}>Tạo</Button>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };