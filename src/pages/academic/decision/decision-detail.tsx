import Header from "@/components/header";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";

import { fetchDecisionsBySemesterId } from "@/lib/api/redux/decisionSlice";
import DecisionView from "./decision-view";


export const DecisionDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchDecisionsBySemesterId(semesterId));
    }
  }, [dispatch, semesterId]);


  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="flex justify-end mt-5 gap-x-2">
            <Link to={`/academic/decision/${semesterId}/create`}>
              <Button className="text-sm">Tạo</Button>
            </Link>
           
          </div>
          <DecisionView />
        
        </div>
      </div>
    </div>
  );
};
