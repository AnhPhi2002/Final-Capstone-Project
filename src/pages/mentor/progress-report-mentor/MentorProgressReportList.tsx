import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorReports } from "@/lib/api/redux/mentorProgressReportSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";

interface MentorProgressReportListProps {
  semesterId: string;
}

export const MentorProgressReportList: React.FC<MentorProgressReportListProps> = ({ semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { reports, loading, error } = useSelector((state: RootState) => state.mentorProgressReport);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchMentorReports(semesterId));
    }
  }, [dispatch, semesterId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải danh sách báo cáo...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Lọc các báo cáo có isDeleted: false
  const activeReports = reports?.filter((report) => !report.isDeleted) || [];

  if (activeReports.length === 0) return <p className="text-center text-gray-500">Không có báo cáo nào.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Danh sách báo cáo tiến độ</h3>
      <DataTable columns={columns} data={activeReports} />
    </div>
  );
};