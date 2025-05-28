import Header from "@/components/header";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";

import { fetchDecisionsBySemesterId } from "@/lib/api/redux/decisionSlice";
import DecisionView from "./decision-view";
// import { Menu } from "./columns/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";
import { Badge } from "@/components/ui/badge";
// import SendMailButton from "./send-mail-button";

export const DecisionDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const { decisions } = useSelector((state: RootState) => state.decision);
  const dispatch = useAppDispatch();
  const { draftFile, finalFile } = useSelector(
    (state: RootState) => state.uploadDecision
  );

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchDecisionsBySemesterId(semesterId));
    }
  }, [dispatch, semesterId]);

  const latestDecision = decisions.length > 0 ? decisions[0] : null;
  // const latestDecision = decisions.find(
  //   (d) => !d.type
  // );
  
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="p-5 flex-1 overflow-auto">
        {/* Chỉ bọc phần nút "Tạo" trong items-end */}
        <div className="flex justify-end mt-5 gap-x-2">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Loại quyết định badge */}
            <div className="flex items-center gap-2">
              {/* <span className="font-bold whitespace-nowrap">Bảng:</span> */}
               {/* {semesterId && <SendMailButton semesterId={semesterId} />} */}
              {latestDecision?.type && (
                <Badge
                  variant={
                    latestDecision.type === "DRAFT" ? "default" : "secondary"
                  }
                  className={
                    latestDecision.type === "DRAFT"
                      ? "bg-yellow-500 text-white hover:bg-yellow-400 px-6 py-2"
                      : "bg-green-500 text-white hover:bg-green-400 px-6 py-2"
                  }
                >
                  {latestDecision.type === "DRAFT"
                    ? "Bảng nháp"
                    : "Bảng chính thức"}
                </Badge>
              )}
            </div>

            {/* Hiển thị decisionURL nếu có */}
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
                    <span className="font-bold whitespace-nowrap">
                      File nháp:
                    </span>
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
          </div>
          {/* {semesterId && (
            <Menu semesterId={semesterId} decisionId={latestDecision?.id} />
          )} */}
        </div>

        <div>
          <DecisionView semesterId={semesterId!} />
        </div>
      </div>
    </div>
  );
};
