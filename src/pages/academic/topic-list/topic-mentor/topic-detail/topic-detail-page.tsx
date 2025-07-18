import Header from "@/components/header";
import { Button } from "@/components/ui/button";

import { Link, useParams } from "react-router";
import TopicDetail from "./topic-detail";

export const TopicDetailPage = () => {
  const { topicId, semesterId } = useParams(); // ✅ Lấy topicId từ URL

  if (!topicId) {
    return <p className="text-center text-red-500">Không tìm thấy đề tài!</p>;
  }
  return (
    <div>
      <Header title="Đề tài đăng ký" href="/" currentPage="Thông tin chi tiết đề tài" />
      <div className="container mx-auto px-6">
        <div className="flex justify-end mt-5">
          <Link to={`/academic/topic-detail/${topicId}/${semesterId}/update`}>
            <Button className="text-sm">Chỉnh sửa đề tài</Button>
          </Link>
        </div>
        <TopicDetail />
      </div>
    </div>
  );
};
