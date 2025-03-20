import Header from "@/components/header"
import ToolPanel from "./tool-panel"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
// import mentorData from "@/data/mentor.json";
// import { Mentor } from "@/types/mentor";
import { fetchMentorsBySemesterId } from "@/lib/api/redux/mentorSlice";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { useSelector } from "react-redux";
import { PaginationDashboardPage } from "@/pages/admin/pagination";

export const MentorDetail = () => {
  // Trích xuất danh sách Mentor từ dữ liệu JSON
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { mentors, loading, error } = useSelector((state: RootState) => state.mentors);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mentors.length / itemsPerPage);

    useEffect(() => {
      if (semesterId) {
        dispatch(fetchMentorsBySemesterId(semesterId));
      }
    }, [dispatch, semesterId]);

      // Slice students for the current page
      const currentMentors = Array.isArray(mentors) ? mentors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) : [];
      
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Danh sách giảng viên hướng dẫn" />
      <div className="p-5 flex-1 overflow-auto">
        <ToolPanel />
        {loading ? (
                  <div className="flex flex-col items-center justify-center h-48">
                    <h1 className="text-xl font-bold">Đang tải dữ liệu...</h1>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-48">
                    <h1 className="text-xl font-bold">Lỗi: {error}</h1>
                  </div>
                ) : (
                  <>
                    <DataTable columns={columns} data={currentMentors} />
                    <div className="flex justify-end mt-6">
                      <PaginationDashboardPage
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(page) => {
                          if (page >= 1 && page <= totalPages) {
                            setCurrentPage(page);
                          }
                        }}
                      />
                    </div>
                  </>
                )}

      </div>
    </div>
  )
}
