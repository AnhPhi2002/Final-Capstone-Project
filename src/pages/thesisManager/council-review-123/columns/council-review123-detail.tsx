import { useEffect, useMemo, useCallback, useState } from "react";
import { CouncilReview } from "@/lib/api/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchCouncilDetail } from "@/lib/api/redux/councilReviewSlice";
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
import { CreateReviewSchedule } from "./CreateReviewSchedule";
import { ArrowLeft } from "lucide-react";
import SendMailButton from "./send-mail-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns"; // Import date-fns format function

export const CouncilReviewDetail = () => {
  const { councilId, semesterId } = useParams<{
    councilId?: string;
    semesterId?: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector(
    (state: RootState) => state.councilReview
  );
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [openCreateSchedule, setOpenCreateSchedule] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (councilId) {
      dispatch(fetchCouncilDetail(councilId));
    }
  }, [dispatch, councilId]);

  useEffect(() => {
    if (shouldRefetch && councilId) {
      dispatch(fetchCouncilDetail(councilId));
      setShouldRefetch(false);
    }
  }, [shouldRefetch, dispatch, councilId]);

  const handleRefetch = useCallback(() => {
    setShouldRefetch(true);
  }, []);

  const tableData = useMemo(() => {
    console.log("Memoizing tableData with councilDetail:", councilDetail);
    return councilDetail ? [councilDetail] : [];
  }, [councilDetail]);

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

  if (!councilId || !semesterId) {
    return (
      <p className="text-center text-red-500">
        Council ID hoặc Semester ID không hợp lệ!
      </p>
    );
  }

  const handleBack = () => {
    navigate("/graduation-thesis/council-review");
  };

  const handleSessionChange = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  // Hàm format reviewTime thành DD-MM-YYYY
  const formatReviewTime = (reviewTime: string) => {
    try {
      const date = new Date(reviewTime);
      return format(date, "dd-MM-yyyy"); // Format thành DD-MM-YYYY
    } catch (error) {
      console.error("Error formatting reviewTime:", error);
      return reviewTime; // Trả về giá trị gốc nếu có lỗi
    }
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
            title="Danh sách hội đồng kiểm tra đồ án"
            href="/graduation-thesis/council-review"
            currentPage="Chi tiết hội đồng kiểm tra đồ án"
          />
          <div className="p-5 flex-1 overflow-auto">
            <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
              <Button onClick={handleBack}>
                <ArrowLeft /> Quay lại
              </Button>
              <div className="flex items-center gap-4 ml-auto">
                {/* Dropdown chọn session */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Chọn phiên review:</span>
                  <Select onValueChange={handleSessionChange} value={selectedSessionId || ""}>
                    <SelectTrigger className="w-[300px]"> {/* Increased width to accommodate more content */}
                      <SelectValue placeholder="Chọn phiên" />
                    </SelectTrigger>
                    <SelectContent>
                      {(councilDetail?.sessions?.length ?? 0) > 0 ? (
                        councilDetail!.sessions
                          .filter((session) => !session.isDeleted)
                          .map((session) => (
                            <SelectItem key={session.id} value={session.id}>
                              <div className="flex items-center justify-between gap-2">
                                <span>
                                  {formatReviewTime(session.reviewTime)} - {session.room || "Chưa có phòng"}
                                </span>
                                {session.group ? (
                                  <span className="text-gray-600 font-medium">
                                    (Nhóm: {session.group.groupCode})
                                  </span>
                                ) : (
                                  <span className="text-gray-400 italic">
                                    (Chưa có nhóm)
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))
                      ) : (
                        <SelectItem value="no-data" disabled>
                          Không có phiên review
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hiển thị SendMailButton khi có session được chọn */}
                {selectedSessionId && (
                  <SendMailButton reviewScheduleId={selectedSessionId} />
                )}

                <Button
                  className="bg-black text-white"
                  onClick={() => setOpenCreateSchedule(true)}
                  disabled={loadingDetail}
                >
                  Tạo lịch review
                </Button>
              </div>
            </div>

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