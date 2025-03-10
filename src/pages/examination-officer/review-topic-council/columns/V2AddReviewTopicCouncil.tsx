// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { createCouncil } from "@/lib/api/redux/councilSlice";
// import { AppDispatch } from "@/lib/api/redux/store";
// import { Toaster, toast } from "sonner";

// type V2AddReviewTopicCouncilProps = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   refetchData?: () => void;
// };

// export const V2AddReviewTopicCouncil: React.FC<V2AddReviewTopicCouncilProps> = ({
//   open,
//   setOpen,
//   refetchData,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     round: "",
//     councilStartDate: "",
//     councilEndDate: "",
//     status: "ACTIVE",
//   });

//   // Reset form khi modal đóng
//   useEffect(() => {
//     if (!open) {
//       setTimeout(() => {
//         setFormValues({
//           name: "",
//           round: "",
//           councilStartDate: "",
//           councilEndDate: "",
//           status: "ACTIVE",
//         });
//       }, 300); // Delay để tránh UI bị lag
//     }
//   }, [open]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async () => {
//     if (!formValues.name || !formValues.round || !formValues.councilStartDate || !formValues.councilEndDate) {
//       toast.error("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     const start = new Date(formValues.councilStartDate);
//     const end = new Date(formValues.councilEndDate);

//     if (end <= start) {
//       toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
//       return;
//     }

//     setLoading(true);

//     try {
//       await dispatch(createCouncil(formValues)).unwrap();
//       toast.success("Tạo hội đồng thành công!");

//       setTimeout(() => {
//         if (refetchData) refetchData(); // Cập nhật danh sách
//         setOpen(false);
//       }, 100);
//     } catch (error: any) {
//       toast.error(`Tạo hội đồng thất bại: ${error.message || "Đã xảy ra lỗi"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null; // Không render modal nếu chưa mở

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <Toaster position="top-right" richColors duration={3000} />
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg">
//         <h2 className="text-xl font-bold mb-4">Thêm Hội đồng mới</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Tên hội đồng</label>
//             <input
//               type="text"
//               name="name"
//               value={formValues.name}
//               onChange={handleChange}
//               placeholder="VD: Hội đồng xét duyệt 2025"
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Vòng xét duyệt</label>
//             <input
//               type="text"
//               name="round"
//               value={formValues.round}
//               onChange={handleChange}
//               placeholder="VD: Vòng 1"
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
//             <input
//               type="date"
//               name="councilStartDate"
//               value={formValues.councilStartDate}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
//             <input
//               type="date"
//               name="councilEndDate"
//               value={formValues.councilEndDate}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Trạng thái</label>
//             <select
//               name="status"
//               value={formValues.status}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2"
//               disabled={loading}
//             >
//               <option value="ACTIVE">Hoạt động</option>
//               <option value="INACTIVE">Không hoạt động</option>
//             </select>
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             onClick={() => setOpen(false)}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
//             disabled={loading}
//           >
//             Hủy
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-black text-white rounded-lg"
//             disabled={loading}
//           >
//             {loading ? "Đang xử lý..." : "Thêm hội đồng"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
