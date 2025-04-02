import { useEffect, useMemo, useCallback, useState } from "react";
import { CouncilReview } from "@/lib/api/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilDefenseSlice";
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
import { CreateReviewSchedule } from "./CreateDefenseSchedule"; 
import { ArrowLeft } from "lucide-react";

export const CouncilDefenseDetail = () => {
  const { councilId, semesterId } = useParams<{
    councilId?: string;
    semesterId?: string;
  }>(); // Thêm semesterId
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector(
    (state: RootState) => state.councilReview
  ); // Giả sử key là councilReviews trong store
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [openCreateSchedule, setOpenCreateSchedule] = useState(false);
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
  const table = useReactTable<CouncilReview>({
    data: tableData,
    columns: columnsCouncils,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      refetchData: handleRefetch,
    },
  });

  // Kiểm tra councilId và semesterId có hợp lệ không
  if (!councilId || !semesterId) {
    return (
      <p className="text-center text-red-500">
        Council ID hoặc Semester ID không hợp lệ!
      </p>
    );
  }
  const handleBack = () => {
    navigate("/examination/council-review");
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
            title="Danh sách hội đồng  kiểm tra đồ án"
            href="/examination/council-review"
            currentPage="Chi tiết hội đồng kiểm tra đồ án"
          />
          <div className="p-5 flex-1 overflow-auto">
            <div className="mb-5 flex justify-between items-center">
              <Button onClick={handleBack}>
                <ArrowLeft /> Quay lại
              </Button>
              <Button
                className="bg-black text-white"
                onClick={() => setOpenCreateSchedule(true)}
                disabled={loadingDetail}
              >
                Tạo lịch review
              </Button>
            </div>

            {/* Tích hợp CreateReviewSchedule */}
            <CreateReviewSchedule
              open={openCreateSchedule}
              setOpen={setOpenCreateSchedule}
              councilId={councilId}
              semesterId={semesterId}
            />

            <DataTable table={table} />
          </div>
        </>
      )}
    </div>
  );
};
