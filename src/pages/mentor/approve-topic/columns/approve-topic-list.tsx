import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchRegisteredTopics } from "@/lib/api/redux/topicSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const ApproveTopicList = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { registeredTopics, loading, error } = useSelector(
    (state: RootState) => state.topics
  );

  useEffect(() => {
    if (semesterId) {
      dispatch(fetchRegisteredTopics({ semesterId }));
    }
  }, [dispatch, semesterId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Danh sách đề tài đã đăng ký</h2>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
      ) : registeredTopics.length === 0 ? (
        <p className="text-center text-gray-500">Không có đề tài nào được đăng ký.</p>
      ) : (
        registeredTopics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => navigate(`/lecturer/approve-topic-detail/${topic.id}/${semesterId}`)}
            className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all mb-4"
          >
            <Badge className="absolute top-4 right-6 px-2 py-1 rounded-md text-xs">
              {topic.status}
            </Badge>

            {/* Avatar */}
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={`https://robohash.org/${encodeURIComponent(topic.nameEn || "Unknown")}.png?size=100x100`}
                alt={topic.nameEn || "No Name"}
              />
              <AvatarFallback>{topic.nameEn ? topic.nameEn.charAt(0) : "?"}</AvatarFallback>
            </Avatar>

            {/* Nội dung đề tài */}
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-primary ">
                <span className="text-blue-500 font-medium">Topic:</span> {topic.nameEn || "Không có tên"}
              </h4>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {topic.description || "Không có mô tả"}
              </p>

              <div className="mt-2 text-xs text-muted-foreground">
                <p>
                  Ngày tạo: <span className="font-medium">{new Date(topic.createdAt).toLocaleDateString()}</span>
                </p>
                <p>
                  Được tạo bởi: <span className="font-medium">{topic.creator?.fullName || "Không xác định"}</span>
                </p>
                <p>
                  Nhóm đăng ký:{" "}
                  {topic.topicRegistrations.length > 0 ? (
                    topic.topicRegistrations.map((reg) => (
                      <span key={reg.id} className="font-medium">
                        {reg.user.email}{" "}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Chưa có nhóm</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
