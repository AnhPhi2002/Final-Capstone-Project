import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "@/components/header";
import DecisionListTopView from "./decision-list-top-view";
import { Menu } from "./columns/menu";
import { AppDispatch } from "@/lib/api/redux/store";
import {
  fetchDecisionListTopic,
  fetchDecisionListTopicById,
  selectDecisionListTopic,
} from "@/lib/api/redux/decisionListTopicSlice";

export const DecisionListTopDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { semesterId, decisionId } = useParams<{ semesterId: string; decisionId?: string }>();

const rawDecisions = useSelector(selectDecisionListTopic);
const decisions = Array.isArray(rawDecisions) ? rawDecisions : [];

const fallbackDecision = decisions.find((d) => d.semesterId === semesterId);
const effectiveDecisionId = decisionId || fallbackDecision?.id;

useEffect(() => {
  if (decisionId) {
    dispatch(fetchDecisionListTopicById(decisionId));
  } else if (semesterId) {
    dispatch(fetchDecisionListTopic());
  }
}, [dispatch, decisionId, semesterId]);

  if (!semesterId) return <p>Missing semesterId in URL</p>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="flex justify-end p-5 gap-x-2">
        <Menu semesterId={semesterId} decisionId={effectiveDecisionId} />
      </div>
      <DecisionListTopView semesterId={semesterId} decisionId={effectiveDecisionId} />
    </div>
  );
};

export default DecisionListTopDetail;
