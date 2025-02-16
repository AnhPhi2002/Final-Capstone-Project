// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface Group {
//   id: string;
//   group_code: string;
//   year: string;
//   code: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   group_members?: any[];
//   max_members: number;
//   mentor_1_id?: string;
//   mentor_2_id?: string;
// }

// interface CardGroupStudentProps {
//   data?: Group[]; // Cho phép `data` là optional để tránh lỗi
// }
// export const CardGroupStudent = ({ data = [] }: CardGroupStudentProps) => {
//   console.log("Data received in CardGroupStudent:", data); 

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {data.length === 0 ? (
//         <p className="text-gray-500">Không có nhóm nào được tìm thấy.</p>
//       ) : (
//         data.map((group) => (
//           <Card key={group.id} className="cursor-pointer hover:shadow-lg">
//             <CardHeader>
//               <CardTitle>{group.group_code}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-500">Năm học: {group.year}</p>
//               <p className="text-sm text-gray-500">Mã học kỳ: {group.code}</p>
//               <p className="text-sm text-gray-500">
//                 Ngày bắt đầu: {new Date(group.start_date).toLocaleDateString()}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Ngày kết thúc: {new Date(group.end_date).toLocaleDateString()}
//               </p>
//               <p className="text-sm text-gray-500">Trạng thái: {group.status}</p>
//               <p className="text-sm text-gray-500">
//                 Số lượng thành viên: {group.group_members ? group.group_members.length : 0} /{" "}
//                 {group.max_members}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Mentor 1: {group.mentor_1_id ? group.mentor_1_id : "Không có"}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Mentor 2: {group.mentor_2_id ? group.mentor_2_id : "Không có"}
//               </p>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };
