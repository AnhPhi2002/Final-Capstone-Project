import Header from "@/components/header";

import { SelectMajor } from "./SelectMajor";
import { CreateTopic } from "./CreateTopic";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

import { fetchTopics, exportTopicsToExcel } from "@/lib/api/redux/topicSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { toast } from "sonner";
import { TopicReviewList } from "./topic-review-list";

export const TopicReviewListPage = () => {
  const { semesterId } = useParams(); 
  const dispatch = useDispatch<AppDispatch>();
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
    <div>
       <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách đề tài giảng viên"
      />
      <div className="flex flex-col h-screen p-6 space-y-6">
     
  
      <div className="flex items-center justify-between">

        <SelectMajor onMajorChange={setSelectedMajor} />

        {/* Các nút nằm bên phải */}
        <div className="flex items-center gap-4 justify-end">
          <Button onClick={handleExportExcel} variant="outline">
            Export danh sách đề tài
          </Button>

          <CreateTopic semesterId={semesterId!} />

          <Link to={`/import-topic-mentor/${semesterId}`}>
            <Button className="flex gap-3 items-center">
              Import đề tài
            </Button>
          </Link>
        </div>
      </div>
      <TopicReviewList selectedMajor={selectedMajor} />
      
    </div>
    </div>
    
  );
};
