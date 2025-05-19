import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./columns/data-table";
import { columns } from "./columns/columns";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { format } from "date-fns";
import {
  fetchDecisionListTopicById,
  fetchGuidanceList,
  selectGuidanceList,
  selectDecisionListTopicLoading,
  selectDecisionListTopicError,
} from "@/lib/api/redux/decisionListTopicSlice";

interface DecisionListTopViewProps {
  semesterId: string;
  decisionId?: string;
}

const DecisionListTopView: React.FC<DecisionListTopViewProps> = ({ semesterId, decisionId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectGuidanceList);
  const isLoading = useSelector(selectDecisionListTopicLoading);
  const error = useSelector(selectDecisionListTopicError);

  const decision = useSelector((state: RootState) =>
    decisionId
      ? state.decisionListTopic.decisions.find((d) => d.id === decisionId)
      : undefined
  );

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchGuidanceList({ semesterId }));
    }
    if (decisionId) {
      dispatch(fetchDecisionListTopicById(decisionId));
    }
  }, [dispatch, semesterId, decisionId]);

  return (
    <div className="max-w-8xl mx-auto p-8">
      <Card className="shadow-lg">
        <CardContent className="p-10">
          <div className="text-center">
            <p className="font-bold uppercase">
              {decision?.decisionTitle || "Danh sách phân công khóa luận"}
            </p>
            <p className="italic mt-3">
              (Ban hành kèm theo Quyết định số {decision?.decisionName || "..."}{" "}
              {decision?.decisionDate
                ? `ngày ${format(new Date(decision.decisionDate), "dd/MM/yyyy")}`
                : ""}
              <br />
              của Giám Đốc phân hiệu Trường Đại học FPT tại TP. Hồ Chí Minh)
            </p>
          </div>

          <div className="mt-6">
            {isLoading && <p className="text-center">Đang tải dữ liệu...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!isLoading && !error && data.length > 0 ? (
              <DataTable columns={columns} data={data} />
            ) : (
              <p className="text-center text-gray-500">
                {semesterId
                  ? `Không có dữ liệu hướng dẫn cho kỳ học ${semesterId}`
                  : "Không có dữ liệu để hiển thị"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionListTopView;
