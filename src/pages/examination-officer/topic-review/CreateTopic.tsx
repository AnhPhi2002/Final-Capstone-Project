// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/api/redux/store";
// import { fetchMajors } from "@/lib/api/redux/majorSlice";
// import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
// import { createTopic, resetState } from "@/lib/api/redux/topicRegisterSlice";
// import { fetchTopics } from "@/lib/api/redux/topicSlice";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";

// type CreateTopicProps = {
//   semesterId: string;
// };

// export const CreateTopic: React.FC<CreateTopicProps> = ({ semesterId }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { data: majors, loading: majorsLoading } = useSelector((state: RootState) => state.majors);
//   const semesterDetail = useSelector((state: RootState) => state.semesters.semesterDetail);
//   const { loading, success } = useSelector((state: RootState) => state.topicRegister);

//   const [open, setOpen] = useState(false);
//   const [topicName, setTopicName] = useState("");
//   const [topicDescription, setTopicDescription] = useState("");
//   const [selectedMajor, setSelectedMajor] = useState<string | undefined>();
//   const [isBusiness, setIsBusiness] = useState(false);
//   const [businessPartner, setBusinessPartner] = useState("");

//   useEffect(() => {
//     dispatch(fetchMajors());
//     dispatch(fetchSemesterDetail(semesterId));
//   }, [dispatch, semesterId]);

//   useEffect(() => {
//     if (success) {
//       setOpen(false);
//       setTopicName("");
//       setTopicDescription("");
//       setSelectedMajor(undefined);
//       setIsBusiness(false);
//       setBusinessPartner("");
//       dispatch(resetState());
//     }
//   }, [success, dispatch]);

//   const handleCreateTopic = async () => {
//     if (!topicName || !topicDescription || !selectedMajor) {
//       toast.error("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     try {
//       await dispatch(
//         createTopic({
//           name: topicName,
//           description: topicDescription,
//           semesterId,
//           majorId: selectedMajor,
//           isBusiness,
//           businessPartner: isBusiness ? businessPartner : "",
//         })
//       ).unwrap();

//       toast.success("Đề tài đã được tạo thành công!");
//       dispatch(fetchTopics({ semesterId, majorId: selectedMajor }));
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
//           <AlertDialogDescription>Vui lòng nhập thông tin đề tài.</AlertDialogDescription>
//         </AlertDialogHeader>

//         <div className="space-y-3">
//           {/* Nhập tên đề tài */}
//           <div>
//             <Label className="block text-sm font-medium">Tên đề tài</Label>
//             <Input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="Nhập tên đề tài" />
//           </div>

//           {/* Nhập mô tả đề tài */}
//           <div>
//             <Label className="block text-sm font-medium">Mô tả</Label>
//             <Input value={topicDescription} onChange={(e) => setTopicDescription(e.target.value)} placeholder="Nhập mô tả đề tài" />
//           </div>

//           {/* Kỳ học (không thể chỉnh sửa) */}
//           <div>
//             <Label className="block text-sm font-medium">Kỳ học</Label>
//             <Input value={semesterDetail?.code || "Đang tải..."} disabled />
//           </div>

//           {/* Chọn ngành học */}
//           <div>
//             <Label className="block text-sm font-medium">Ngành học</Label>
//             <Select onValueChange={setSelectedMajor} defaultValue={selectedMajor}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Chọn ngành học" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {majorsLoading ? (
//                     <SelectItem value="loading" disabled>Đang tải...</SelectItem>
//                   ) : (
//                     majors.map((major) => (
//                       <SelectItem key={major.id} value={major.id}>
//                         {major.name}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Công tắc chọn loại dự án */}
//           <div className="flex items-center gap-3">
//             <Switch id="business-toggle" checked={isBusiness} onCheckedChange={setIsBusiness} />
//             <Label htmlFor="business-toggle">Dự án doanh nghiệp</Label>
//           </div>

//           {/* Nếu là dự án doanh nghiệp, hiển thị ô nhập tên doanh nghiệp */}
//           {isBusiness && (
//             <div>
//               <Label className="block text-sm font-medium">Tên doanh nghiệp</Label>
//               <Input
//                 value={businessPartner}
//                 onChange={(e) => setBusinessPartner(e.target.value)}
//                 placeholder="Nhập tên doanh nghiệp"
//               />
//             </div>
//           )}
//         </div>

//         {/* Nút hành động */}
//         <AlertDialogFooter>
//           <AlertDialogCancel>Hủy</AlertDialogCancel>
//           <AlertDialogAction asChild>
//             <Button onClick={handleCreateTopic} disabled={loading}>
//               {loading ? "Đang tạo..." : "Tạo đề tài"}
//             </Button>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
