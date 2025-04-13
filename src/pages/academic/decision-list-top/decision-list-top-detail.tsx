import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/header";
import DecisionListTopView from "./decision-list-top-view";
import { Menu } from "./columns/menu";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { fetchDecisions } from "@/lib/api/redux/decisionListTopc";

export const DecisionListTopDetail: React.FC = () => {
  const { decisionId, semesterId } = useParams<{ decisionId?: string; semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { decisions, loading, error } = useSelector((state: RootState) => state.decisionListTop);

  // Fetch decisions for the semester
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchDecisions({ semesterId }));
    }
  }, [semesterId, dispatch]);

  // Determine the decisionId to use
  const effectiveDecisionId = decisionId || (decisions.length > 0 ? decisions[0].id : undefined);

  // Add a check for semesterId to avoid undefined errors
  if (!semesterId) {
    return <div>Lỗi: Không tìm thấy semesterId</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="flex justify-end p-5 gap-x-2">
        <Menu semesterId={semesterId} decisionId={effectiveDecisionId} />
      </div>
      <div className="p-5 flex-1 overflow-auto">
      <div className="mt-6">
  {loading && <p>Đang tải quyết định...</p>}
  {error && <p className="text-red-500">{error}</p>}

  {!loading && !effectiveDecisionId && (
    <p className="text-lg text-center ">Chưa có quyết định hướng dẫn đề tài nào được tạo cho học kỳ này.</p>
  )}

  {!loading && effectiveDecisionId && (
    <DecisionListTopView semesterId={semesterId} decisionId={effectiveDecisionId} />
  )}
</div>

      </div>
    </div>
  );
};

export default DecisionListTopDetail;