import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { fetchApprovalTopics, resetApprovalTopics } from "@/lib/api/redux/topicSlice";
import { fetchUserDetail } from "@/lib/api/redux/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { resetGroupDetail } from "@/lib/api/redux/groupDetailSlice";

// ✅ Trạng thái tiếng Việt
const getVietnameseStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "Đã duyệt";
    case "REJECTED":
      return "Từ chối";
    case "PENDING":
      return "Chờ duyệt";
    case "IMPROVED":
      return "Cần chỉnh sửa";
    default:
      return "Không xác định";
  }
};

// ✅ Màu sắc theo trạng thái
const getStatusClass = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700 hover:bg-green-200";
    case "REJECTED":
      return "bg-red-100 text-red-700 hover:bg-red-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    case "IMPROVED":
      return "bg-black text-white hover:bg-zinc-800"; // ✅ Chữ trắng, nền đen
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const ReviewTopicList = () => {
  const { semesterId, submissionPeriodId, roundNumber } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    approvalTopics: topics = [],
    loading: topicsLoading,
    error,
  } = useSelector((state: RootState) => state.topics);

  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (semesterId && submissionPeriodId && roundNumber) {
      dispatch(resetGroupDetail());
      dispatch(resetApprovalTopics());
      dispatch(
        fetchApprovalTopics({
          semesterId,
          submissionPeriodId,
          round: Number(roundNumber),
        })
      );
    }
  }, [dispatch, semesterId, submissionPeriodId, roundNumber]);

  useEffect(() => {
    topics.forEach((topic) => {
      if (topic.createdBy && !usernames[topic.createdBy]) {
        dispatch(fetchUserDetail(topic.createdBy)).then((result) => {
          if (result.meta.requestStatus === "fulfilled" && result.payload) {
            const username = (result.payload as { username: string }).username;
            if (username) {
              setUsernames((prev) => ({
                ...prev,
                [topic.createdBy!]: username,
              }));
            }
          }
        });
      }
    });
  }, [dispatch, topics, usernames]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-1 flex-col gap-4">
        {topicsLoading ? (
          <p className="text-center text-gray-500">Đang tải danh sách đề tài...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : topics.length === 0 ? (
          <p className="text-center text-gray-500">Không có đề tài nào trong vòng này.</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() =>
                navigate(`/lecturer/review-topic-detail/${topic.id}/${semesterId}`)
              }
              className="relative min-h-[130px] w-full rounded-lg bg-muted/50 flex items-center p-4 gap-x-6 cursor-pointer hover:bg-muted transition-all"
            >
              <Badge
                className={`absolute top-4 right-6 px-2 py-1 rounded-md text-xs ${getStatusClass(
                  topic.status
                )}`}
              >
                {getVietnameseStatus(topic.status)}
              </Badge>

              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`https://robohash.org/${encodeURIComponent(
                    topic.name || "Unknown"
                  )}.png?size=100x100`}
                  alt={topic.name || "No Name"}
                />
                <AvatarFallback>{topic.name ? topic.name.charAt(0) : "?"}</AvatarFallback>
              </Avatar>

              {/* Nội dung đề tài */}
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-primary">
                  <span className="text-blue-500 font-medium">Đề tài:</span>{" "}
                  {topic.nameEn || "Không có tên"}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {topic.description || "Không có mô tả"}
                </p>

                <div className="mt-2 text-xs text-muted-foreground">
                  <p>
                    Ngày tạo:{" "}
                    <span className="font-medium">
                      {new Date(topic.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                  <p>
                    Được tạo bởi:{" "}
                    <span className="font-medium">
                      {usernames[topic.createdBy!] ||
                        (topic.creator?.fullName === "lecturer"
                          ? "Giảng viên"
                          : topic.creator?.fullName || "Không xác định")}
                    </span>
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