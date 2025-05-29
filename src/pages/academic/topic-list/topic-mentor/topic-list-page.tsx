import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { fetchTopics, exportTopicsToExcel, resetTopicDetail } from "@/lib/api/redux/topicSlice";
import { Link, useParams } from "react-router";
import { CreateTopic } from "./CreateTopic";
import Header from "@/components/header";
import { TopicList } from "./topic-list";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SelectMajor } from "./SelectMajor";
import { resetMainMentor } from "@/lib/api/redux/authSlice";
import { resetSubMentor } from "@/lib/api/redux/authSubSlice";
import SendMailButton from "./send-mail-button";

export const TopicListPage = () => {
  const { semesterId, submissionPeriodId } = useParams<{ semesterId: string; submissionPeriodId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading: topicsLoading } = useSelector((state: RootState) => state.topics);
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();

  useEffect(() => {
    dispatch(resetTopicDetail());
    dispatch(resetMainMentor());
    dispatch(resetSubMentor());
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, submissionPeriodId, majorId: selectedMajor }));
    }
  }, [dispatch, semesterId, selectedMajor]);

  const handleExportExcel = async () => {
    if (!submissionPeriodId || !semesterId) {
      toast.error("Không tìm thấy kỳ nộp hoặc kỳ học.");
      return;
    }

    try {
      await dispatch(exportTopicsToExcel({ submissionPeriodId, semesterId })).unwrap();
      toast.success("Xuất danh sách đề tài thành công!");
    } catch (error: any) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Tổng quan"
        href="/"
        currentPage="Danh sách đề tài giảng viên"
      />

      <div className="flex flex-col flex-1">
        <div className="sticky top-16 bg-white z-40 p-6 rounded-md">
          <div className="flex items-center justify-between">
            <SelectMajor onMajorChange={setSelectedMajor} />
            <div className="flex items-center gap-4 justify-end">
              <div className="col-span-3">
                {semesterId && <SendMailButton semesterId={semesterId} />}
              </div>
              <Button onClick={handleExportExcel} variant="outline" disabled={topicsLoading}>
                Export danh sách đề tài
              </Button>
              <CreateTopic semesterId={semesterId!} submissionPeriodId={submissionPeriodId!} />
              <Link to={`/academic/import-topic-mentor/${semesterId}`}>
                <Button className="flex gap-3 items-center">Import đề tài</Button>
              </Link>
              <Link to={`/academic/import-business-topic/${semesterId}/submission-period/${submissionPeriodId}`}>
                <Button className="flex gap-3 items-center">Import đề tài doanh nghiệp</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <TopicList selectedMajor={selectedMajor} />
        </div>
      </div>
    </div>
  );
};