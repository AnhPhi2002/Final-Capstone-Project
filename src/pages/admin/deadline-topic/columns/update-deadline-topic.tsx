import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSubmissionRound, fetchSubmissionRounds } from "@/lib/api/redux/submissionRoundSlice";
import { AppDispatch } from "@/lib/api/redux/store";
import { Toaster, toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UpdateDeadlineTopicProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  round: {
    id: string;
    semesterId: string;
    roundNumber: number;
    description: string;
    startDate: string;
    endDate: string;
  };
};

export const UpdateDeadlineTopic: React.FC<UpdateDeadlineTopicProps> = ({ open, setOpen, round }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [updating, setUpdating] = useState(false);

  const [formValues, setFormValues] = useState({
    roundNumber: round.roundNumber,
    startDate: round.startDate.split("T")[0], // Lấy đúng phần YYYY-MM-DD
    endDate: round.endDate.split("T")[0], // Lấy đúng phần YYYY-MM-DD
    description: round.description,
  });

  useEffect(() => {
    if (open) {
      setFormValues({
        roundNumber: round.roundNumber,
        startDate: round.startDate.split("T")[0],
        endDate: round.endDate.split("T")[0],
        description: round.description,
      });
    }
  }, [open, round]);

  const convertToISODate = (dateString: string, isEndDate = false) => {
    return isEndDate 
      ? `${dateString}T23:59:59.999Z` 
      : `${dateString}T00:00:00.000Z`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    if (!formValues.startDate || !formValues.endDate || !formValues.description) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (new Date(formValues.endDate) <= new Date(formValues.startDate)) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    setUpdating(true);

    try {
      const resultAction = await dispatch(
        updateSubmissionRound({
          roundId: round.id,
          updatedData: {
            roundNumber: Number(formValues.roundNumber),
            description: formValues.description,
            semesterId: round.semesterId,
            startDate: convertToISODate(formValues.startDate),
            endDate: convertToISODate(formValues.endDate, true),
          },
        })
      );

      console.log("API Response:", resultAction);

      // Kiểm tra kết quả
      if (updateSubmissionRound.fulfilled.match(resultAction)) {
        toast.success("Cập nhật vòng nộp thành công!");
        setOpen(false);
        dispatch(fetchSubmissionRounds(round.semesterId));
      } else {
        const errorMessage = (resultAction.payload as { message?: string })?.message || "Cập nhật thất bại!";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("Lỗi cập nhật vòng nộp:", error);
      toast.error(`Cập nhật thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    } finally {
      setUpdating(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster position="top-right" richColors duration={3000} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Cập nhật vòng nộp</h2>

        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Lần nộp</Label>
            <Input
              type="number"
              name="roundNumber"
              value={formValues.roundNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Tên vòng nộp</Label>
            <Input
              type="text"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Ngày bắt đầu</Label>
            <Input
              type="date"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Ngày kết thúc</Label>
            <Input
              type="date"
              name="endDate"
              value={formValues.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={updating}
            className={`px-4 py-2 rounded-lg ${updating ? "bg-gray-400" : "bg-black text-white"}`}
          >
            {updating ? "Đang cập nhật..." : "Lưu cập nhật"}
          </Button>
        </div>
      </div>
    </div>
  );
};
