import { useEffect, useMemo, useCallback, useState } from "react";
import { CouncilDetail } from "@/lib/api/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilSlice";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { columnsCouncils } from "./columns";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ReviewTopicCouncilDetail = () => {
  const { councilId } = useParams<{ councilId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector(
    (state: RootState) => state.councils
  );
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const navigate = useNavigate();
  // Fetch chi tiết hội đồng khi component mount hoặc councilId thay đổi
  useEffect(() => {
    if (councilId) {
      dispatch(fetchCouncilDetail(councilId));
    }
  }, [dispatch, councilId]);

  // Kiểm soát refetch khi cần
  useEffect(() => {
    if (shouldRefetch && councilId) {
      dispatch(fetchCouncilDetail(councilId));
      setShouldRefetch(false);
    }
  }, [shouldRefetch, dispatch, councilId]);

  const handleRefetch = useCallback(() => {
    setShouldRefetch(true);
  }, []);

  // Memoize dữ liệu đầu vào thay vì useReactTable
  const tableData = useMemo(() => {
    console.log("Memoizing tableData with councilDetail:", councilDetail);
    return councilDetail ? [councilDetail] : [];
  }, [councilDetail]);

  // Gọi useReactTable ở top level
  const table = useReactTable<CouncilDetail>({
    data: tableData,
    columns: columnsCouncils,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      refetchData: handleRefetch,
    },
  });
  const handleBack = () => {
    navigate("/examination/review-topic-council");
  };
  return (
    <div className="flex flex-col h-screen">
      {loadingDetail ? (
        <p className="text-center text-gray-500">
          Đang tải thông tin hội đồng...
        </p>
      ) : (
        <>
          <Header
            title="Danh sách hội xét duyệt đề tài"
            href="examination/review-topic-council"
            currentPage="Chi tiết hội đồng xét duyệt đề tài "
          />
          <div className="flex justify-start px-5 mt-5">
            <Button onClick={handleBack}>
              <ArrowLeft /> Quay lại
            </Button>
          </div>

          <div className="p-5 flex-1 overflow-auto">
            <DataTable table={table} />
          </div>
        </>
      )}
    </div>
  );
};
