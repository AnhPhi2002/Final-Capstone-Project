import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics, resetTopicDetail } from "@/lib/api/redux/topicSlice";
import {  useParams } from "react-router"; // Sửa lỗi import
// import { CreateTopic } from "./CreateTopic";
import Header from "@/components/header";
import { TopicList } from "./topic-list";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
import { SelectMajor } from "./SelectMajor";
import { resetMainMentor } from "@/lib/api/redux/authSlice";
import { resetSubMentor } from "@/lib/api/redux/authSubSlice";

export const TopicListPage = () => {
  const { semesterId} = useParams<{ semesterId: string; submissionPeriodId: string }>(); // Type-safe params
  const dispatch = useDispatch<AppDispatch>();
  // const { loading: topicsLoading } = useSelector((state: RootState) => state.topics); 
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();

  // Fetch topics khi semesterId hoặc selectedMajor thay đổi
  useEffect(() => {
       dispatch(resetTopicDetail());
          dispatch(resetMainMentor()); 
          dispatch(resetSubMentor());
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor }));
    }
  
  }, [dispatch, semesterId, selectedMajor]);

  // const handleExportExcel = async () => {
  //   if (!submissionPeriodId || !semesterId) {
  //     toast.error("Không tìm thấy kỳ nộp hoặc kỳ học.");
  //     return;
  //   }

  //   try {
  //     await dispatch(exportTopicsToExcel({ submissionPeriodId, semesterId })).unwrap();
  //     toast.success("Xuất danh sách đề tài thành công!");
  //   } catch (error: any) {
  //     toast.error(error?.message || "Xuất danh sách thất bại!");
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
        <div className="sticky top-16 bg-white z-40 p-6 rounded-md">
          <div className="flex items-center justify-between">
            <SelectMajor onMajorChange={setSelectedMajor} />
            {/* <div className="flex items-center gap-4 justify-end">
              <Button onClick={handleExportExcel} variant="outline" disabled={topicsLoading}>
                Export danh sách đề tài
              </Button>
              <CreateTopic semesterId={semesterId!} />
              <Link to={`/import-topic-mentor/${semesterId}`}>
                <Button className="flex gap-3 items-center">Import đề tài</Button>
              </Link>
            </div> */}
          </div>
        </div>

        {/* Danh sách Topic */}
        <div className="flex-1 overflow-y-auto p-6">
          <TopicList />
        </div>
      </div>
    </div>
  );
};