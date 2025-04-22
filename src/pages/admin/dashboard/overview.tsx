import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import {
  fetchStudentQualification,
  fetchStudentGroupStatus,
  selectStatistics,
} from "@/lib/api/redux/statisticsSlice";

interface OverviewProps {
  semesterId: string;
}

interface CardProps {
  status: string;
  total: number;
}

const Card: React.FC<CardProps> = ({ status, total }) => {
  return (
    <div className="col-span-3 bg-white rounded-lg p-3 shadow">
      <h3 className="text-sm">{status}</h3>
      <p className="text-2xl font-bold py-3">{total}</p>
    </div>
  );
};

const Overview: React.FC<OverviewProps> = ({ semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { studentQualification, studentGroupStatus } = useSelector(selectStatistics);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchStudentQualification(semesterId));
      dispatch(fetchStudentGroupStatus(semesterId));
    }
  }, [semesterId, dispatch]);

  const loading = studentQualification.loading || studentGroupStatus.loading;
  const error = studentQualification.error || studentGroupStatus.error;

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-600">Lỗi: {error}</p>;

  const qualified = studentQualification.data.find((s) => s.status === "Qualified")?.total ?? 0;
  const notQualified = studentQualification.data.find((s) => s.status === "Not Qualified")?.total ?? 0;
  const hasGroup = studentGroupStatus.data.find((s) => s.status === "Has Group")?.total ?? 0;
  const noGroup = studentGroupStatus.data.find((s) => s.status === "No Group")?.total ?? 0;

  return (
    <div className="grid grid-cols-12 gap-5">
      <Card status="Tổng số sinh viên đủ điều kiện" total={qualified} />
      <Card status="Tổng số sinh viên không đủ điều kiện" total={notQualified} />
      <Card status="Tổng số sinh viên có nhóm" total={hasGroup} />
      <Card status="Tổng số sinh viên chưa có nhóm" total={noGroup} />
    </div>
  );
};

export default Overview;
