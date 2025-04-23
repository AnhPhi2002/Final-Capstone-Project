import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/header";
import DecisionListTopView from "./decision-list-top-view";
// import { Menu } from "./columns/menu";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import {
  fetchDecisions,
  resetGuidanceFetched,
} from "@/lib/api/redux/decisionListTopc";
import { fetchGuidanceList } from "@/lib/api/redux/getDecisionListTableSlice";
import { fetchDecisionById } from "@/lib/api/redux/decisionListTopc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const DecisionListTopDetail: React.FC = () => {
  const { decisionId, semesterId } = useParams<{
    decisionId?: string;
    semesterId: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    decisions,
    decisionDetails,
    loading: decisionLoading,
    error: decisionError,
    isGuidanceFetched,
    hasFetchedDecisions,
  } = useSelector((state: RootState) => state.decisionListTop);
  const { loading: guidanceLoading, error: guidanceError } = useSelector(
    (state: RootState) => state.decisionTable
  );
  const { draftFile, finalFile } = useSelector(
    (state: RootState) => state.uploadDecision
  );
  // Fetch decisions for the semester
  useEffect(() => {
    if (semesterId && !decisionLoading && !hasFetchedDecisions) {
      dispatch(resetGuidanceFetched());
      dispatch(fetchDecisions({ semesterId }));
    }
  }, [semesterId, dispatch, decisionLoading, hasFetchedDecisions]);

  // Xác định effectiveDecisionId
  const effectiveDecisionId =
    decisionId || (decisions.length > 0 ? decisions[0].id : undefined);

  // Fetch guidanceList và decisionById sau khi có decisions
  useEffect(() => {
    if (
      semesterId &&
      decisions.length > 0 &&
      !isGuidanceFetched &&
      !guidanceLoading
    ) {
      dispatch(fetchGuidanceList({ semesterId, includeAI: false }));
    }
  }, [
    semesterId,
    decisions.length,
    dispatch,
    isGuidanceFetched,
    guidanceLoading,
  ]);

  useEffect(() => {
    if (
      effectiveDecisionId &&
      decisions.length > 0 &&
      !decisionLoading &&
      !decisionDetails
    ) {
      dispatch(fetchDecisionById(effectiveDecisionId));
    }
  }, [
    effectiveDecisionId,
    decisions.length,
    dispatch,
    decisionLoading,
    decisionDetails,
  ]);

  // Kiểm tra semesterId để tránh lỗi undefined
  if (!semesterId) {
    return (
      <div className="p-5 text-red-500">Lỗi: Không tìm thấy semesterId</div>
    );
  }

  // Tổng hợp trạng thái loading và error
  const isLoading = decisionLoading || guidanceLoading;
  const error = decisionError || guidanceError;
  const latestDecision = decisions.length > 0 ? decisions[0] : null;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="flex justify-end p-5 gap-x-2">
        {latestDecision?.type && (
          <Badge
            variant={latestDecision.type === "DRAFT" ? "default" : "secondary"}
            className={
              latestDecision.type === "DRAFT"
                ? "bg-yellow-500 text-white hover:bg-yellow-400 px-6 py-2"
                : "bg-green-500 text-white hover:bg-green-400 px-6 py-2"
            }
          >
            {latestDecision.type === "DRAFT" ? "Bảng nháp" : "Bảng chính thức"}
          </Badge>
        )}
        {latestDecision?.decisionURL && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                latestDecision?.decisionURL &&
                window.open(latestDecision.decisionURL, "_blank")
              }
            >
              {draftFile?.fileName ||
                finalFile?.fileName ||
                "Tải file quyết định"}
            </Button>
          </div>
        )}

        {/* Hiển thị draftFile hoặc finalFile nếu không có decisionURL */}
        {!latestDecision?.decisionURL && (
          <>
            {latestDecision?.type === "DRAFT" && draftFile?.fileUrl && (
              <div className="flex items-center gap-2">
                <span className="font-bold whitespace-nowrap">File nháp:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(draftFile.fileUrl, "_blank")}
                >
                  {draftFile.fileName}
                </Button>
              </div>
            )}
            {latestDecision?.type === "FINAL" && finalFile?.fileUrl && (
              <div className="flex items-center gap-2">
                <span className="font-bold whitespace-nowrap">
                  File chính thức:
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(finalFile.fileUrl, "_blank")}
                >
                  {finalFile.fileName}
                </Button>
              </div>
            )}
          </>
        )}
        {/* <Menu semesterId={semesterId} decisionId={effectiveDecisionId} /> */}
      </div>
      <div className="p-5 flex-1 overflow-auto">
        {isLoading ? (
          <p className="text-center">Đang tải...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : decisions.length > 0 ? (
          <div className="mt-6">
            <DecisionListTopView
              semesterId={semesterId}
              decisionId={effectiveDecisionId}
            />
          </div>
        ) : (
          <p className="text-center">
            Không có quyết định hướng dẫn đề tài nào cho học kỳ này
          </p>
        )}
      </div>
    </div>
  );
};

export default DecisionListTopDetail;
