
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const TimelineDetail = () => {
  const navigate = useNavigate();

  const timelineDetail = {
    id: "e951ee69-d493-43fe-9080-321bb2ba500e",
    semesterId: "497b4fe5-cf09-4dcf-ae8b-a20cd4fbe1ca",
    round: 1,
    startDate: "2023-02-24T00:00:00.000Z",
    endDate: "2027-03-10T23:59:59.999Z",
    status: "ACTIVE",
    description: "Đợt đăng ký sớm dành cho sinh viên",
    createdBy: "7363c106-851e-460d-9184-149b8fc89db9",
    createdAt: "2025-02-28T14:18:58.556Z",
    updatedAt: "2025-02-28T14:18:58.556Z",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Chi tiết thời gian nộp đề tài</h2>
        <Button className="bg-blue-600 text-white" onClick={() => navigate("/create-timeline")}>Tạo Timeline</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><strong>ID:</strong> {timelineDetail.id}</div>
        <div><strong>Học kỳ:</strong> {timelineDetail.semesterId}</div>
        <div><strong>Đợt:</strong> {timelineDetail.round}</div>
        <div><strong>Bắt đầu:</strong> {new Date(timelineDetail.startDate).toLocaleString()}</div>
        <div><strong>Kết thúc:</strong> {new Date(timelineDetail.endDate).toLocaleString()}</div>
        <div><strong>Trạng thái:</strong> <span className="text-green-600 font-bold">{timelineDetail.status}</span></div>
        <div className="col-span-2"><strong>Mô tả:</strong> {timelineDetail.description}</div>
        <div><strong>Người tạo:</strong> {timelineDetail.createdBy}</div>
        <div><strong>Ngày tạo:</strong> {new Date(timelineDetail.createdAt).toLocaleString()}</div>
        <div><strong>Cập nhật lần cuối:</strong> {new Date(timelineDetail.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default TimelineDetail;
