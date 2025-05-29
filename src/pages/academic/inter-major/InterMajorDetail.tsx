import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterMajorById } from "@/lib/api/redux/interMajorSlice";
import { fetchSemesterDetail } from "@/lib/api/redux/semesterSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { interMajorDetailColumns, InterMajorDetailRow } from "./columns/interMajorDetailColumns";
import { DataTable } from "./columns/data-table";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const InterMajorDetail: React.FC = () => {
  const { interMajorId } = useParams<{ interMajorId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selected, loading, error } = useSelector((state: RootState) => state.interMajor);
  const [semesterCode, setSemesterCode] = useState<string | null>(null);

  useEffect(() => {
    if (interMajorId) {
      dispatch(fetchInterMajorById({ id: interMajorId }));
    }
  }, [dispatch, interMajorId]);

  useEffect(() => {
    if (selected?.semesterId) {
      dispatch(fetchSemesterDetail(selected.semesterId))
        .unwrap()
        .then((data) => setSemesterCode(data.code))
        .catch(() => setSemesterCode(null));
    }
  }, [dispatch, selected]);

  const rows: InterMajorDetailRow[] = selected
    ? [
        {
          id: selected.id,
          name: selected.name,
          firstMajor: selected.firstMajor?.name || "",
          secondMajor: selected.secondMajor?.name || "",
          semester: semesterCode ?? selected.semesterId,
          isActive: selected.isActive,
          semesterId: selected.semesterId,
          firstMajorId: selected.firstMajorId,
          secondMajorId: selected.secondMajorId,
        },
      ]
    : [];

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/academic/inter-major"
        currentPage="Chi tiết liên ngành"
      />
       <div className="pt-5 pl-5">
    <Button
    
      onClick={() => navigate("/academic/inter-major")} // quay lại trang trước, hoặc sửa thành navigate("/academic/inter-major")
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Quay lại
    </Button>
  </div>
      <div className="p-6 flex-1 overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <h1 className="text-xl font-bold">Đang tải dữ liệu...</h1>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-48">
            <h1 className="text-xl font-bold">Lỗi: {error}</h1>
          </div>
        ) : (
          <DataTable columns={interMajorDetailColumns} data={rows} />
        )}
      </div>
    </div>
  );
};