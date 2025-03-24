import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTopicsStudent } from "@/lib/api/redux/topicStudentSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const AllTopicList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { availableTopics, loading, error } = useSelector(
    (state: RootState) => state.topicStudents
  );

  useEffect(() => {

    dispatch(fetchAllTopicsStudent());
  }, [dispatch]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-1 flex-col gap-4">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : availableTopics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào.</p>
        ) : (
          availableTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/student/all-topics-student/${topic.id}/${topic.semester.id}`)}
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              <Badge className="absolute top-4 right-6 px-2 py-1 rounded-md text-xs">
                {topic.status}
              </Badge>

              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://robohash.org/${encodeURIComponent(topic.nameEn || "Unknown")}.png?size=100x100`}
                  alt={topic.nameEn || "Không có tên"}
                />
                <AvatarFallback>{topic.nameEn?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>

              {/* Nội dung đề tài */}
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-primary ">
                <span>Tên tiếng anh: </span>
                  {topic.nameEn || "Không có tên"}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed">
                    <span>Mổ tả: </span>
                  {topic.description || "Không có mô tả"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
