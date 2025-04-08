import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics, resetTopicDetail } from "@/lib/api/redux/topicSlice";
import { useNavigate, useParams } from "react-router"; // Sửa lỗi import
import Header from "@/components/header";
import { TopicList } from "./topic-list";
import { SelectMajor } from "./SelectMajor";
import { resetMainMentor } from "@/lib/api/redux/authSlice";
import { resetSubMentor } from "@/lib/api/redux/authSubSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SendMailButton from "./send-mail-button";

export const TopicListPage = () => {
  const { semesterId } = useParams<{
    semesterId: string;
    submissionPeriodId: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();

  useEffect(() => {
    dispatch(resetTopicDetail());
    dispatch(resetMainMentor());
    dispatch(resetSubMentor());
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor }));
    }
  }, [dispatch, semesterId, selectedMajor]);
  const handleBack = () => {
    navigate("/examination/topic");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Đề tài đã xét duyệt"
        href="/examination/topic"
        currentPage="Danh sách đề tài đã xét duyệt"
      />

      <div className="flex flex-col flex-1 p-5">
        <div className="sticky top-16 bg-white z-40  rounded-md mb-5">
          <div className="flex items-center justify-between">
            <div>
              <Button onClick={handleBack}>
                <ArrowLeft /> Quay lại
              </Button>
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center gap-x-4">
                {semesterId && <SendMailButton semesterId={semesterId} />}
                <SelectMajor onMajorChange={setSelectedMajor} />
              </div>

            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TopicList />
        </div>
      </div>
    </div>
  );
};
