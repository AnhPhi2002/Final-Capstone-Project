// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchInterMajorById } from "@/lib/api/redux/interMajorSlice";
// import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
// import { RootState, AppDispatch } from "@/lib/api/redux/store";
// import { interMajorDetailColumns, InterMajorDetailRow } from "./columns/interMajorDetailColumns";
// import { DataTable } from "./columns/data-table";
// import Header from "@/components/header";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";

// export const InterMajorDetail: React.FC = () => {
//   const { interMajorId } = useParams<{ interMajorId: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { selected, loading, error } = useSelector((state: RootState) => state.interMajor);
//   const [semesterCode, setSemesterCode] = useState<string | null>(null);

//   useEffect(() => {
//     if (interMajorId) {
//       dispatch(fetchInterMajorById({ id: interMajorId }));
//     }
//   }, [dispatch, interMajorId]);

//   useEffect(() => {
//     if (selected?.semesterId) {
//       dispatch(fetchSemesterDetail(selected.semesterId))
//         .unwrap()
//         .then((data) => setSemesterCode(data.code))
//         .catch(() => setSemesterCode(null));
//     }
//   }, [dispatch, selected]);

//   const rows: InterMajorDetailRow[] = selected
//     ? [
//         {
//           id: selected.id,
//           name: selected.name,
//           firstMajor: selected.firstMajor?.name || "",
//           secondMajor: selected.secondMajor?.name || "",
//           semester: semesterCode ?? selected.semesterId,
//           isActive: selected.isActive,
//           semesterId: selected.semesterId,
//           firstMajorId: selected.firstMajorId,
//           secondMajorId: selected.secondMajorId,
//         },
//       ]
//     : [];

//   return (
//     <div className="flex flex-col h-screen">
//       <Header
//         title="Tổng quan"
//         href="/academic/inter-major"
//         currentPage="Chi tiết liên ngành"
//       />
//        <div className="pt-5 pl-5">
//     <Button
    
//       onClick={() => navigate("/academic/inter-major")} // quay lại trang trước, hoặc sửa thành navigate("/academic/inter-major")
//     >
//       <ArrowLeft className="w-4 h-4 mr-2" />
//       Quay lại
//     </Button>
//   </div>
//       <div className="p-6 flex-1 overflow-auto">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center h-48">
//             <h1 className="text-xl font-bold">Đang tải dữ liệu...</h1>
//           </div>
//         ) : error ? (
//           <div className="flex flex-col items-center justify-center h-48">
//             <h1 className="text-xl font-bold">Lỗi: {error}</h1>
//           </div>
//         ) : (
//           <DataTable columns={interMajorDetailColumns} data={rows} />
//         )}
//       </div>
//     </div>
//   );
// };
// =====
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchInterMajorById, deleteInterMajorConfig, updateInterMajorConfig } from "@/lib/api/redux/interMajorSlice";
// import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
// import { RootState, AppDispatch } from "@/lib/api/redux/store";
// import { interMajorDetailColumns, InterMajorDetailRow } from "./columns/interMajorDetailColumns";
// import { DataTable } from "./columns/data-table";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { Pencil, Trash2 } from "lucide-react";
// import Header from "@/components/header";
// // import ToolPanel from "@/components/tool-panel";

// export const InterMajorDetail: React.FC = () => {
//   const { interMajorId } = useParams<{ interMajorId: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { selected, loading, error } = useSelector((state: RootState) => state.interMajor);
//   const [semesterCode, setSemesterCode] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     if (interMajorId) {
//       dispatch(fetchInterMajorById({ id: interMajorId }));
//     }
//   }, [dispatch, interMajorId]);

//   useEffect(() => {
//     if (selected) {
//       setName(selected.name || "");
//       if (selected.semesterId) {
//         dispatch(fetchSemesterDetail(selected.semesterId))
//           .unwrap()
//           .then((data) => setSemesterCode(data.code))
//           .catch(() => setSemesterCode(null));
//       }
//     }
//   }, [dispatch, selected]);

//   const handleDelete = async () => {
//     if (selected?.id) {
//       try {
//         await dispatch(deleteInterMajorConfig(selected.id)).unwrap();
//         toast.success("Đã xóa liên ngành thành công");
//         navigate("/academic/inter-major");
//       } catch (err) {
//         toast.error(`Lỗi khi xóa: ${err}`);
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (selected?.id) {
//       try {
//         await dispatch(
//           updateInterMajorConfig({
//             id: selected.id,
//             name,
//             semesterId: selected.semesterId,
//             firstMajorId: selected.firstMajorId,
//             secondMajorId: selected.secondMajorId,
//             isActive: selected.isActive,
//           })
//         ).unwrap();
//         toast.success("Cập nhật tên liên ngành thành công");
//         setOpen(false);
//         dispatch(fetchInterMajorById({ id: interMajorId! }));
//       } catch (err) {
//         toast.error(`Lỗi: ${err}`);
//       }
//     }
//   };

//   const rows: InterMajorDetailRow[] = selected
//     ? [
//         {
//           id: selected.id,
//           name: selected.name,
//           firstMajor: selected.firstMajor?.name || "",
//           secondMajor: selected.secondMajor?.name || "",
//           semester: semesterCode ?? selected.semesterId,
//           isActive: selected.isActive,
//           semesterId: selected.semesterId,
//           firstMajorId: selected.firstMajorId,
//           secondMajorId: selected.secondMajorId,
//         },
//       ]
//     : [];

//   return (
//     <div className="flex flex-col h-screen">
//       <Header
//         title="Tổng quan"
//         href="/academic/inter-major"
//         currentPage="Chi tiết liên ngành"
//       />
//       <div className="p-5 flex-1 overflow-auto">
//         {/* <ToolPanel /> */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center h-48">
//             <h1 className="text-xl font-bold">Đang tải dữ liệu...</h1>
//           </div>
//         ) : error ? (
//           <div className="flex flex-col items-center justify-center h-48">
//             <h1 className="text-xl font-bold">Lỗi: {error}</h1>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-end mb-4">
//               <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="mr-2 bg-blue-600 hover:bg-blue-700 text-white">
//                     <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Chỉnh sửa tên liên ngành</DialogTitle>
//                   </DialogHeader>
//                   <Input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="border-gray-300 focus:ring-blue-500"
//                   />
//                   <DialogFooter className="mt-4">
//                     <Button
//                       onClick={handleSubmit}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       Lưu
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//               <Button
//                 onClick={handleDelete}
//                 className="bg-red-600 hover:bg-red-700 text-white"
//               >
//                 <Trash2 className="mr-2 h-4 w-4" /> Xóa
//               </Button>
//             </div>
//             <DataTable columns={interMajorDetailColumns} data={rows} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };