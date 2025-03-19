// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// import { fetchAllTopicsStudent } from "@/lib/api/redux/topicStudentSlice";
// import { DataTable } from "./data-table";
// import { columns } from "./columns";
// import ToolPanel from "./tool-panel";
// import { PaginationDashboardPage } from "../../pagination";

// export const AllTopicDetail = () => {
//   const dispatch = useAppDispatch();
//   const { availableTopics, loading, error } = useAppSelector(
//     (state) => state.topicStudents
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     dispatch(fetchAllTopicsStudent);
//   }, [dispatch]);

//   const currentTopics = availableTopics.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );


//   const totalPages =
//     availableTopics && availableTopics.length > 0
//       ? Math.ceil(availableTopics.length / itemsPerPage)
//       : 1;

//   return (
//     <div className="flex flex-col">
//       <ToolPanel />

//       {loading && <p>Đang tải danh sách đề tài...</p>}
//       {error && <p className="text-red-500">Lỗi: {error}</p>}

//       {!loading && !error && (
//         <>
//           <DataTable columns={columns} data={currentTopics} />
//           <div className="flex justify-end mt-6">
//             <PaginationDashboardPage
//               totalPages={totalPages}
//               currentPage={currentPage}
//               onPageChange={(page) => {
//                 if (page >= 1 && page <= totalPages) {
//                   setCurrentPage(page);
//                 }
//               }}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
