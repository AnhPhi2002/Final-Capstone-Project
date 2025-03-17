import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchApprovalTopics, resetApprovalTopics } from "@/lib/api/redux/topicSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SelectRound } from "./select-round";
import { resetGroupDetail } from "@/lib/api/redux/groupDetailSlice";

export const ReviewTopicList = () => {
  const { semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [round, setRound] = useState<number>(1); // ✅ Lưu round trong state

  const { approvalTopics: topics = [], loading: topicsLoading, error } = useSelector(
    (state: RootState) => state.topics
  );

  useEffect(() => {
    if (semesterId) {
      dispatch(resetGroupDetail());
      dispatch(resetApprovalTopics()); // ✅ Xóa dữ liệu cũ trước khi gọi API mới
      dispatch(fetchApprovalTopics({ semesterId, round }));
    }
  }, [dispatch, semesterId, round]);

  return (
    <div className="bg-background text-foreground min-h-screen p-6">
      {/* ✅ Chọn vòng duyệt */}
      <SelectRound onRoundChange={setRound} />

      <div className="flex flex-1 flex-col gap-4 mt-4">
        {topicsLoading ? (
          <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p> // ✅ Hiển thị lỗi nếu không có đề tài
        ) : topics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào trong vòng này.</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/examination/review-topic-detail/${topic.id}/${semesterId}`)}
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              <Badge className="absolute top-4 right-6 px-2 py-1 rounded-md text-xs">
                {topic.status}
              </Badge>

              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://robohash.org/${encodeURIComponent(topic.name || "Unknown")}.png?size=100x100`}
                  alt={topic.name || "No Name"}
                />
                <AvatarFallback>{topic.name ? topic.name.charAt(0) : "?"}</AvatarFallback>
              </Avatar>

              {/* Nội dung đề tài */}
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-primary ">
                  <span className="text-blue-500 font-medium ">Topic:</span> {topic.nameEn || "Không có tên"}
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
