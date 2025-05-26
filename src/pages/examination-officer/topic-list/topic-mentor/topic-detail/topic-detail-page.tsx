import Header from "@/components/header";
import { useNavigate, useParams } from "react-router";
import TopicDetail from "./topic-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const TopicDetailPage = () => {
  const navigate = useNavigate();
  const { topicId, semesterId, submissionPeriodId, roundNumber } = useParams();
  if (!topicId) {
    return <p className="text-center text-red-500">Không tìm thấy đề tài!</p>;
  }

  const handleBack = () => {
    navigate(
      `/examination/topic-list/semester/${semesterId}/submission/${submissionPeriodId}/round/${roundNumber}`
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Danh sách đề tài đã xét duyệt"
        href={`/examination/topic-list/semester/${semesterId}/submission/${submissionPeriodId}/round/${roundNumber}`}
        currentPage="Chi tiết đề tài đã xét duyệt"
      />
      <div className="p-6 flex-1 overflow-auto">
        <div className="flex justify-start mb-5">
          <Button onClick={handleBack}>
            <ArrowLeft /> Quay lại
          </Button>
        </div>
        <TopicDetail />
      </div>
    </div>
  );
};