import Header from "@/components/header";
import { Button } from "@/components/ui/button";

import { Link, useNavigate, useParams } from "react-router";

import ReviewTopicDetail from "./topic-detail";
import { ArrowLeft } from "lucide-react";

export const ReviewTopicDetailPage = () => {
  const { topicId, semesterId } = useParams(); // ✅ Lấy topicId từ URL
  const navigate = useNavigate();
  if (!topicId) {
    return <p className="text-center text-red-500">Không tìm thấy đề tài!</p>;
  }
  const handleBack = () => {
    navigate("/lecturer/review-topic-list");
  };
  return (
    <div>
      <Header title="Danh sách đề tài chờ xét duyệt" href="/lecturer/review-topic-list" currentPage="Chi tiết đề tài chờ xét duyệt" />
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mt-5 mb-5">
          <Button onClick={handleBack}>
            <ArrowLeft /> Quay lại
          </Button>
          <Link
            to={`/lecturer/review-topic-detail/${topicId}/${semesterId}/update`}
          >
            <Button className="text-sm">Chỉnh sửa đề tài</Button>
          </Link>
        </div>
        <ReviewTopicDetail />
      </div>
    </div>
  );
};
