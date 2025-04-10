import Header from "@/components/header";

import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { fetchAllDecisions } from "@/lib/api/redux/decisionListTopicSlice";
import DecisionListTopView from "./decision-list-top-view";
import { Menu } from "./columns/menu";


export const DecisionListTopDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { decisions } = useSelector((state: RootState) => state.decisionList);

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchAllDecisions()); // Lấy tất cả quyết định
    }
  }, [dispatch, semesterId]);

  const latestDecision = decisions.find((d) => d.semesterId === semesterId);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex justify-end mt-5 gap-x-2">
          <Menu semesterId={semesterId || ""} decisionId={latestDecision?.id} />
        </div>
        <div className="mt-6">
          {semesterId && (
            <DecisionListTopView
              semesterId={semesterId}
              submissionPeriodId={undefined}
              majorId={undefined}
              decisionId={latestDecision?.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionListTopDetail;