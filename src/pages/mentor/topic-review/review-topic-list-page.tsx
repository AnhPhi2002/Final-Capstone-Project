import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { fetchTopics } from "@/lib/api/redux/topicSlice";
import { useNavigate, useParams } from "react-router";

import Header from "@/components/header";
import { ReviewTopicList } from "./review-topic-list";

import { SelectMajor } from "./SelectMajor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ReviewTopicListPage = () => {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    if (semesterId) {
      dispatch(fetchTopics({ semesterId, majorId: selectedMajor }));
    }
  }, [dispatch, semesterId, selectedMajor]);
  const handleBack = () => {
    navigate("/lecturer/review-topic-page");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Đề tài chờ xét duyệt"
        href="/lecturer/review-topic-page"
        currentPage="Danh sách đề tài chờ xét duyệt"
      />

      <div className="flex flex-col flex-1 p-5">
        <div className="sticky top-16 bg-white z-40  rounded-md mb-5">
          <div className="flex items-center justify-between">
            <div >
              <Button onClick={handleBack}>
                <ArrowLeft /> Quay lại
              </Button>
            </div>
            <div className="flex items-center justify-end">
              <SelectMajor onMajorChange={setSelectedMajor} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto ">
          <ReviewTopicList />
        </div>
      </div>
    </div>
  );
};
