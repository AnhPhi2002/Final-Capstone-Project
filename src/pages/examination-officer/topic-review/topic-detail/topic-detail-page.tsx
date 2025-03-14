import Header from "@/components/header";
import { Button } from "@/components/ui/button";

import { Link, useParams } from "react-router";


import ReviewTopicDetail from "./topic-detail";

export const ReviewTopicDetailPage = () => {
  const { topicId, semesterId } = useParams(); // ✅ Lấy topicId từ URL

  if (!topicId) {
    return <p className="text-center text-red-500">Không tìm thấy đề tài!</p>;
  }
  return (
    <div>
      <Header title="Hồ sơ" href="/" currentPage="Thông tin cá nhân" />
      <div className="container mx-auto px-6">
        <div className="flex justify-end mt-5">
          <Link to={`/examination/review-topic-detail/${topicId}/${semesterId}/update`}>
            <Button className="text-sm">Chỉnh sửa đề tài</Button>
          </Link>
        </div>
        <ReviewTopicDetail />
      </div>
    </div>
  );
};
