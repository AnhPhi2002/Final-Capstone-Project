// // components/Action.tsx
// import React from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/lib/api/redux/store";
// import { deleteCouncilMember, fetchCouncilDetail } from "@/lib/api/redux/councilReviewSlice";
// import { toast } from "sonner";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { MoreHorizontal } from "lucide-react";

// interface ActionProps {
//   councilId: string;
//   userId: string;
// }

// export const Action: React.FC<ActionProps> = ({ councilId, userId }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const handleDelete = async () => {
//     try {
//       await dispatch(deleteCouncilMember({ councilId, userId })).unwrap();
//       toast.success("Xóa thành viên thành công!");
//       dispatch(fetchCouncilDetail(councilId));
//     } catch (error) {
//       console.error("Delete member failed:", error);
//       toast.error("Xóa thành viên thất bại!");
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={handleDelete} className="text-red-600">
//           Xóa thành viên
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };