import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics, exportTopicsToExcel } from "@/lib/api/redux/topicSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { PaginationDashboardPage } from "../../pagination";
import { SelectMajor } from "./SelectMajor";
import { CreateTopic } from "./CreateTopic"; // Import CreateTopic
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


// Hàm rút gọn mô tả
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const TopicList = () => {
  const { semesterId } = useParams(); // Lấy semesterId từ URL
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: topics, loading: topicsLoading } = useSelector(
    (state: RootState) => state.topics
  );

  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor })); // Fetch topics theo bộ lọc
    }
  }, [dispatch, semesterId, selectedMajor]);

  const handleExportExcel = async () => {
    if (!semesterId) {
      toast.error("Không tìm thấy học kỳ.");
      return;
    }
  
    try {
      await dispatch(exportTopicsToExcel(semesterId)).unwrap();
      toast.success("Xuất danh sách đề tài thành công!");
    } catch (error: any) {
      toast.error(error || "Xuất danh sách thất bại!");
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header
        title="Danh sách sinh viên"
        href="/"
        currentPage="Chi tiết danh sách sinh viên trong kỳ"
      />

      {/* Chọn ngành và tạo đề tài */}
      <div className="my-4 flex items-center gap-4">
        <SelectMajor onMajorChange={setSelectedMajor} />
        <CreateTopic semesterId={semesterId!} />
        <Button onClick={handleExportExcel} variant="outline">
      Export danh sách đề tài
    </Button>
      </div>

      {/* Danh sách Topic */}
      <div className="flex flex-1 flex-col gap-4 mt-4">
        {topicsLoading ? (
          <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
        ) : topics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào trong học kỳ này.</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/topic-detail/${topic.id}`)}
              className="min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={`https://robohash.org/${encodeURIComponent(topic.name)}.png?size=100x100`} alt={topic.name} />
                <AvatarFallback>{topic.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 py-3">
                <h4 className="font-semibold text-lg text-primary">{topic.name}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Nội dung:{truncateText(topic.description, 120)}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Trạng Thái: {topic.status}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Tác giả: {topic.creator.fullName}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
