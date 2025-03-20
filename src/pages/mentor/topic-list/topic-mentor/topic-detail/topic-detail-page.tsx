import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router";
import TopicDetail from "./topic-detail";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/api/redux/store";

export const TopicDetailPage = () => {
  const { topicId, semesterId } = useParams(); // ✅ Lấy topicId từ URL
  const { topicDetails } = useSelector((state: RootState) => state.topics); // Lấy thông tin đề tài từ Redux
  const navigate = useNavigate(); // Dùng useNavigate thay vì Link

  if (!topicId) {
    return <p className="text-center text-red-500">Không tìm thấy đề tài!</p>;
  }

  // Kiểm tra trạng thái và vô hiệu hóa nút nếu là "IMPROVED" hoặc "REJECTED"
  const isEditDisabled = topicDetails?.status === "IMPROVED" || topicDetails?.status === "REJECTED" || topicDetails?.status === "APPROVED";

  const handleEditClick = (e: React.MouseEvent) => {
    if (isEditDisabled) {
      e.preventDefault();  // Ngừng hành động mặc định nếu nút bị vô hiệu
      return;
    }
    navigate(`/lecturer/topic-detail/${topicId}/${semesterId}/update`);
  };

  return (
    <div>
      <Header title="Hồ sơ" href="/" currentPage="Thông tin cá nhân" />
      <div className="container mx-auto px-6">
        <div className="flex justify-end mt-5">
          {/* Chỉ cho phép điều hướng khi nút không bị vô hiệu */}
          <Button
            className="text-sm"
            disabled={isEditDisabled}
            onClick={handleEditClick} // Gọi hàm xử lý khi click
          >
            Chỉnh sửa đề tài
          </Button>
        </div>
        <TopicDetail />
      </div>
    </div>
  );
};
