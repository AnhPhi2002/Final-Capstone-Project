import { AddReviewMemberTopicCouncil } from "./add-council-member";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ToolPanel({
  // table,
  councilId,
  refetchData,
  semesterId,
}: {
  table: any;
  councilId: string;
  refetchData: () => void;
  semesterId: string;
}) {
  const handleBack = () => {
    window.history.back();
  };

  // Log để kiểm tra semesterId từ params
  console.log("🔍 ToolPanel semesterId (from params):", semesterId);

  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Nút quay lại bên trái */}
      <div>
        <Button onClick={handleBack}>
          <ArrowLeft /> Quay lại
        </Button>
      </div>

      {/* Các tool khác bên phải */}
      <div className="flex items-center space-x-4">
        {semesterId ? (
          <AddReviewMemberTopicCouncil
            councilId={councilId}
            refetchData={refetchData}
            semesterId={semesterId}
          />
        ) : (
          <Button disabled>Thêm Thành viên hội đồng (Chưa có semesterId)</Button>
        )}
      </div>
    </div>
  );
}