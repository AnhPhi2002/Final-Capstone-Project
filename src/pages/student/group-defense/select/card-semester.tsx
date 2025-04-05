// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/api/redux/store";
// import { Semester } from "@/lib/api/types";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { PaginationDashboardPage } from "../../pagination";

// type CardSemesterProps = {
//   data: Semester[];
// };

// export const CardSemester: React.FC<CardSemesterProps> = ({ data }) => {
//   const navigate = useNavigate();
//   const years = useSelector((state: RootState) => state.years.data);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // Số lượng items trên mỗi trang
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const getYearById = (yearId: string) => {
//     const foundYear = years.find((year) => year.id === yearId);
//     return foundYear ? foundYear.year : "Unknown Year";
//   };

//   const handleCardClick = (id: string) => {
//     navigate(`/student/group-student/${id}`); // Điều hướng đúng đến trang nhóm theo kỳ học
//   };

//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedData.length === 0 ? (
//           <p className="text-gray-500 text-center col-span-full">
//             No semesters available
//           </p>
//         ) : (
//           paginatedData.map((semester) => (
//             <Card
//               key={semester.id}
//               className="w-full p-4 shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
//               onClick={() => handleCardClick(semester.id)}
//             >
//               <CardHeader>
//                 <CardTitle className="text-xl font-bold text-gray-800">
//                   Học kỳ: {semester.code}
//                 </CardTitle>
//                 <CardDescription>
//                   Năm học: {getYearById(semester.yearId)}
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//           ))
//         )}
//       </div>

//       <div className="flex justify-end mt-6">
//         <PaginationDashboardPage
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// // navigate(`/group-student/${id}`); // Điều hướng đúng đến trang nhóm theo kỳ học