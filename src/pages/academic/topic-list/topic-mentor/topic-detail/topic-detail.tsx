import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicDetail, deleteTopic, resetTopicDetail } from "@/lib/api/redux/topicSlice";
import { RootState, AppDispatch } from "@/lib/api/redux/store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataTableGroupTopic } from "./data-table-group-topic";
import { fetchUserById, resetMainMentor } from "@/lib/api/redux/authSlice";
import { resetGroupDetail } from "@/lib/api/redux/groupDetailSlice";
import { fetchSubUserById, resetSubMentor } from "@/lib/api/redux/authSubSlice"

export default function TopicDetail() {
  const { topicId, semesterId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { topicDetails, loading, error } = useSelector(
    (state: RootState) => state.topics
  );
  const { author: auth } = useSelector((state: RootState) => state.auth);
  const { author: mainMentor } = useSelector((state: RootState) => state.auth);
  const { author: subMentor } = useSelector((state: RootState) => state.authSub);

  useEffect(() => {
    // ✅ Reset mainMentor và subMentor trước khi fetch API
    dispatch(resetGroupDetail()); 
    dispatch(resetMainMentor()); 
    dispatch(resetSubMentor());
    dispatch(resetTopicDetail());
  
    // ✅ Đợi reset xong rồi mới gọi API mới
    setTimeout(() => {
      if (topicId && semesterId) {
        dispatch(fetchTopicDetail({ topicId, semesterId }));
  
        if (topicDetails?.mainSupervisor) {
          dispatch(fetchUserById({ userId: topicDetails.mainSupervisor, semesterId }));
        }
  
        if (topicDetails?.subSupervisor) {
          dispatch(fetchSubUserById({ userId: topicDetails.subSupervisor, semesterId }));
        }
      }
    }, 50); // Chờ 50ms để đảm bảo Redux đã reset xong trước khi fetch dữ liệu mới
  
  }, [dispatch, topicId, semesterId]);

  // useEffect(() => {
  //   if (topicDetails?.createdBy && topicDetails?.semesterId) {
  //     dispatch(fetchUserById({ userId: topicDetails.createdBy, semesterId: topicDetails.semesterId }));
  //   }
  // }, [dispatch, topicDetails?.createdBy, topicDetails?.semesterId]);

  useEffect(() => {
    if (topicDetails?.mainSupervisor && topicDetails?.semesterId) {
      dispatch(fetchUserById({ userId: topicDetails.mainSupervisor, semesterId: topicDetails.semesterId }));
    }
  }, [dispatch, topicDetails?.mainSupervisor, topicDetails?.semesterId]);

  useEffect(() => {
    if (topicDetails?.subSupervisor && topicDetails?.semesterId) {
      dispatch(fetchSubUserById({ userId: topicDetails.subSupervisor, semesterId: topicDetails.semesterId }));
    }
  }, [dispatch, topicDetails?.subSupervisor, topicDetails?.semesterId]);

  if (loading)
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

  if (error && !topicDetails) {
    useEffect(() => {
      if (error) toast.error(error);
    }, [error]);
    return (
      <p className="text-center text-red-500">Lỗi khi tải đề tài: {error}</p>
    );
  }

  if (!topicDetails)
    return (
      <p className="text-center text-gray-500">
        Không tìm thấy đề tài hoặc đang tải...
      </p>
    );

  const handleDeleteTopic = async () => {
    if (!topicId || !semesterId) {
      toast.error("Không thể xác định đề tài cần xóa!");
      return;
    }

    if (!confirm("Bạn có chắc muốn xóa đề tài này?")) return;

    try {
      toast.success("Xóa đề tài thành công")
      await dispatch(deleteTopic({ topicId, semesterId })).unwrap();
      navigate("/academic/topic"); // ✅ Điều hướng sau khi xóa thành công
    } catch (error) {
      // toast.error("Lỗi khi xóa đề tài!");
      toast.error(`${error}`)
    }
  };
  const handleOpenFile = (fileUrl: string) => {
    // Mở URL trong tab mới
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };
  const getGroupId = () => {
    console.log("Topic Details:", topicDetails); // Debug dữ liệu topicDetails
    if (topicDetails.status === "PENDING") {
      return topicDetails.group?.id;
    } else if (["APPROVED", "IMPROVED"].includes(topicDetails.status)) {
      return topicDetails.topicAssignments?.[0]?.groupId; // Lấy groupId từ phần tử đầu tiên của mảng topicAssignments
    }
    return undefined;
  };
  return (
    <div>
      <div className="mt-6 bg-white">
        <Card className="p-6">
          <div className="flex items-center mt-4 gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Topic Avatar"
              />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                ({topicDetails.nameEn || "Chưa có tên tiếng Anh"})
              </h3>
              <p className="text-sm text-gray-500 italic">
  Created at:{" "}
  {topicDetails.createdAt
    ? new Date(topicDetails.createdAt).toLocaleDateString()
    : "Không xác định"}{" "}
  <span className="font-bold">by {topicDetails.creator?.fullName || "không có tác giả"}</span>
</p>

            </div>
          </div>

          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên viết tắt</p>
                <p className="font-semibold italic">
                  {topicDetails.name || "Không có tên viết tắt"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tên tiếng việt</p>
                <p className="font-semibold italic">
                  {topicDetails.nameVi || "Chưa có tiêu đề tiếng Việt"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngành</p>
                <p className="font-semibold italic">
                  {topicDetails.majors?.length > 0
                    ? topicDetails.majors.map(major => major.name).join(", ")
                    : "Chưa có chuyên ngành"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                <Badge>
                  {topicDetails.status || "Chưa cập nhật trạng thái"}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 1</p>
                <p className="font-semibold italic">
                  {mainMentor?.email ? (
                    <span className="text-blue-600">{mainMentor.email}</span>
                  ) : (
                    <span className="text-red-500">Chưa có mentor 1</span>
                  )}
                </p>
              </div>
              {/* 🔹 Thêm phần hiển thị Mentor phụ */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Mentor 2</p>
                <p className="font-semibold italic">
                  {subMentor?.email ? (
                    <span className="text-blue-600">{subMentor.email}</span>
                  ) : (
                    <span className="text-red-500">Chưa có mentor 2</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tài liệu</p>
                {topicDetails.documents && topicDetails.documents.length > 0 ? (
                  topicDetails.documents.map((doc, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="mr-2 mb-2"
                      onClick={() => handleOpenFile(doc.fileUrl)}
                    >
                      Xem {doc.fileName || "Tài liệu"}
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Chưa cập nhật trạng thái</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Đánh giá đề tài</p>
                <p className="font-semibold italic">
                  {topicDetails?.reviewReason || "Đề tài chưa được đánh giá"}
                </p>
              </div>
            </div>

             <div>
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <p className="italic text-gray-800">
                {topicDetails.description || "Chưa có mô tả"}
              </p>
            </div> 
          </CardContent>


          <div>
            <DataTableGroupTopic groupId={getGroupId()} />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="destructive" onClick={handleDeleteTopic}>
              Xóa đề tài
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
