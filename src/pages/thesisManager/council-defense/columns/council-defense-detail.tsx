import { useEffect, useMemo, useCallback, useState } from "react";
import { CouncilDefense } from "@/lib/api/types";
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
import SendMailButton from "./send-mail-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns"; // Import date-fns for formatting

export const CouncilDefenseDetail = () => {
  const { councilId, semesterId } = useParams<{
    councilId?: string;
    semesterId?: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { councilDetail, loadingDetail } = useSelector(
    (state: RootState) => state.councilDefense
  );
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [openCreateSchedule, setOpenCreateSchedule] = useState(false);
  const [selectedDefenseScheduleId, setSelectedDefenseScheduleId] = useState<string | null>(null);
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

  const table = useReactTable<CouncilDefense>({
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
    navigate("/graduation-thesis/council-defense");
  };

  const handleDefenseScheduleChange = (defenseScheduleId: string) => {
    setSelectedDefenseScheduleId(defenseScheduleId);
  };

  // Hàm format defenseTime thành DD-MM-YYYY
  const formatDefenseTime = (defenseTime: string) => {
    try {
      const date = new Date(defenseTime);
      return format(date, "dd-MM-yyyy"); // Format thành DD-MM-YYYY
    } catch (error) {
      console.error("Error formatting defenseTime:", error);
      return defenseTime; // Trả về giá trị gốc nếu có lỗi
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
            title="Danh sách hội đồng bảo vệ đồ án"
            href="/graduation-thesis/council-defense"
            currentPage="Chi tiết hội đồng bảo vệ đồ án"
          />
          <div className="p-5 flex-1 overflow-auto">
            <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
              <Button onClick={handleBack}>
                <ArrowLeft /> Quay lại
              </Button>
              <div className="flex items-center gap-4 ml-auto">
                {/* Dropdown chọn lịch bảo vệ */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Chọn lịch bảo vệ:</span>
                  <Select
                    onValueChange={handleDefenseScheduleChange}
                    value={selectedDefenseScheduleId || ""}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Chọn lịch" />
                    </SelectTrigger>
                    <SelectContent>
                      {(councilDetail?.defenseSchedules?.length ?? 0) > 0 ? (
                        councilDetail!.defenseSchedules
                          .filter((schedule) => !schedule.isDeleted)
                          .map((schedule) => (
                            <SelectItem key={schedule.id} value={schedule.id}>
                              {formatDefenseTime(schedule.defenseTime)} - {schedule.room || "Chưa có phòng"}
                            </SelectItem>
                          ))
                      ) : (
                        <SelectItem value="no-data" disabled>
                          Không có lịch bảo vệ
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hiển thị SendMailButton khi có lịch được chọn */}
                {selectedDefenseScheduleId && (
                  <SendMailButton reviewScheduleId={selectedDefenseScheduleId} />
                )}

                <Button
                  className="bg-black text-white"
                  onClick={() => setOpenCreateSchedule(true)}
                  disabled={loadingDetail}
                >
                  Tạo lịch bảo vệ
                </Button>
              </div>
            </div>

            <CreateReviewSchedule
              open={openCreateSchedule}
              setOpen={setOpenCreateSchedule}
              councilId={councilId}
              semesterId={semesterId}
              defenseRound={councilDetail?.round ?? 1}
            />

            <DataTable table={table} />
          </div>
        </>
      )}
    </div>
  );
};