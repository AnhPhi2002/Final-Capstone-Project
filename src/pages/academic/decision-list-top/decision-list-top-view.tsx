import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./columns/data-table";
import { columns } from "./columns/columns";
import { fetchGuidanceList } from "@/lib/api/redux/getDecisionListTableSlice";
import { fetchThesisAssignments, fetchDecisionById } from "@/lib/api/redux/decisionListTopc";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { format } from "date-fns";

interface DecisionListTopViewProps {
  submissionPeriodId?: string;
  majorId?: string;
  decisionId?: string;
  semesterId?: string;
}

export const DecisionListTopView: React.FC<DecisionListTopViewProps> = ({
  decisionId,
  semesterId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    guidanceList,
    loading: guidanceLoading,
    error: guidanceError,
  } = useSelector((state: RootState) => state.decisionTable);

  const {
    thesisAssignments,
    decisions,
    loading: decisionListLoading,
    error: decisionListError,
  } = useSelector((state: RootState) => state.decisionListTop);

  const textClass = "text-[14.5pt] font-times leading-[1.5]";

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGuidanceList({ semesterId, includeAI: false }));
    }
    if (decisionId) {
      dispatch(fetchThesisAssignments(decisionId));
      dispatch(fetchDecisionById(decisionId)); // Fetch decision details
    }
  }, [semesterId, decisionId, dispatch]);

  const isLoading = guidanceLoading || decisionListLoading;
  const error = guidanceError || decisionListError;

  // Find the decision by decisionId
  const decision = decisions.find((d) => d.id === decisionId);

  // Format decision date for display in Vietnamese style (e.g., "ngày 01 tháng 04 năm 2025")
  const formatDecisionDate = (dateString: string) => {
    if (!dateString) return "ngày ___ tháng ___ năm ___";
    const date = new Date(dateString);
    return `ngày ${format(date, "dd")} tháng ${format(date, "MM")} năm ${format(date, "yyyy")}`;
  };

  // ✅ Prioritize thesisAssignments if available, otherwise fallback to guidanceList
  const data =
    decisionId && thesisAssignments.length > 0
      ? thesisAssignments
      : guidanceList;

  return (
    <div className="max-w-8xl mx-auto p-8">
      <Card className={`${textClass} shadow-lg`}>
        <CardContent className="p-10">
          <div className="text-center">
            <p className="font-bold uppercase">
              {decision?.decisionTitle || "DANH SÁCH GIAO VÀ HƯỚNG DẪN KHÓA LUẬN TỐT NGHIỆP"}
            </p>
            <p className="italic mt-3">
              (Ban hành kèm theo Quyết định số{" "}
              {decision?.decisionName || decisionId || "___"}{" "}
              {formatDecisionDate(decision?.decisionDate || "")}
              <br />
              của Giám Đốc phân hiệu Trường Đại học FPT tại TP. Hồ Chí Minh)
            </p>
          </div>

          <div className="mt-6">
            {isLoading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && data.length > 0 ? (
              <DataTable columns={columns} data={data} />
            ) : (
              !isLoading &&
              !error && (
                <p className="text-center">Không có dữ liệu để hiển thị</p>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionListTopView;