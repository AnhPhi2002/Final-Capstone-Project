import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReports } from "@/lib/api/redux/progressReportSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { DataTable } from "./columns/data-table";
import { columns } from "./columns/columns";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";
import UpdateProgressReportForm from "./UpdateProgressReportForm";

const ProgressReportList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reports, loading, error } = useSelector((state: RootState) => state.progressReport);
  const [selectedReport, setSelectedReport] = useState<ProgressReport | null>(null);

  useEffect(() => {
    dispatch(fetchMyReports());
  }, [dispatch]);

  const handleUpdateClick = (report: ProgressReport) => {
    setSelectedReport(report);
  };

  const handleCloseUpdateForm = () => {
    setSelectedReport(null);
  };

  return (
    <div className="mt-6 relative">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Danh sách báo cáo tiến độ</h3>

      {loading && <p className="text-center text-gray-500">Đang tải danh sách báo cáo...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (!reports || reports.length === 0) && (
        <p className="text-center text-gray-500">Không có báo cáo nào.</p>
      )}

      {reports && reports.length > 0 && (
        <DataTable columns={columns} data={reports} onUpdateClick={handleUpdateClick} />
      )}

      {/* Form cập nhật dạng overlay thủ công */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Cập nhật báo cáo tiến độ</h2>
            <UpdateProgressReportForm report={selectedReport} onCancel={handleCloseUpdateForm} />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={handleCloseUpdateForm}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReportList;
