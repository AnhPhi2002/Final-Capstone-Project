import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics} from "@/lib/api/redux/topicSlice";
import { useParams } from "react-router";
// import { CreateTopic } from "./CreateTopic";
import Header from "@/components/header";
import { ReviewTopicList } from "./review-topic-list";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
import { SelectMajor } from "./SelectMajor";


export const ReviewTopicListPage = () => {
  const { semesterId} = useParams(); // Lấy cả semesterId và submissionPeriodId từ URL
  const dispatch = useDispatch<AppDispatch>();

  // const { data: topics } = useSelector((state: RootState) => state.topics);
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor })); // Fetch topics theo semesterId
    }
  }, [dispatch, semesterId, selectedMajor]);

  // const handleExportExcel = async () => {
  //   if (!submissionPeriodId) {
  //     toast.error("Không tìm thấy kỳ nộp.");
  //     return;
  //   }

  //   try {
  //     await dispatch(exportTopicsToExcel(submissionPeriodId)).unwrap();
  //     toast.success("Xuất danh sách đề tài thành công!");
  //   } catch (error: any) {
  //     toast.error(error || "Xuất danh sách thất bại!");
  //   }
  // };

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách đề tài giảng viên"
      />

      <div className="flex flex-col flex-1">
        {/* Phần lọc (SelectMajor + Button) */}
        <div className="sticky top-16 bg-white z-40 p-6 rounded-md ">
          <div className="flex items-center justify-between">
            <SelectMajor onMajorChange={setSelectedMajor} />
            <div className="flex items-center gap-4 justify-end">
            </div>
          </div>
        </div>

        {/* Danh sách Topic */}
        <div className="flex-1 overflow-y-auto p-6 ">
          <ReviewTopicList />
        </div>
      </div>
    </div>
  );
};
