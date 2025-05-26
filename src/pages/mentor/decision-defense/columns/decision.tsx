import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { confirmDefenseRound } from "@/lib/api/redux/councilReviewSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReviewSchedule } from "@/lib/api/types";

type DecisionProps = {
  schedule: ReviewSchedule;
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchData?: () => void;
};

export const Decision: React.FC<DecisionProps> = ({ schedule, open, setOpen, refetchData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [mentorDecision, setMentorDecision] = useState<"PASS" | "NOT_PASS" | "">("");
  const [defenseRound, setDefenseRound] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const semesterId = schedule.schedule.group.semesterId;
  const groupCode = schedule.schedule.group.groupCode;

const handleSubmit = async () => {
  if (!mentorDecision) {
    toast.error("Vui lòng chọn trạng thái!");
    return;
  }

  // Khi PASS bắt buộc chọn defenseRound
  if (mentorDecision === "PASS" && (defenseRound === null || defenseRound === undefined)) {
    toast.error("Vui lòng chọn vòng bảo vệ khi trạng thái là Đạt!");
    return;
  }

  setIsLoading(true);
  try {
    // Chuẩn bị payload theo yêu cầu backend
    const payload = {
      groupCode,
      defenseRound: mentorDecision === "PASS" ? defenseRound : null,
      mentorDecision,
      semesterId,
    };

    console.log("Confirm defense round successful:", payload);

    await dispatch(confirmDefenseRound(payload)).unwrap();

    toast.success("Xác nhận vòng bảo vệ thành công!");

    await refetchData?.();

    setOpen(false);
    setMentorDecision("");
    setDefenseRound(null);
  } catch (error) {
    console.error("Confirm defense round failed:", error);
    toast.error(`${error}`);
  } finally {
    setIsLoading(false);
  }
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Xác nhận vòng bảo vệ nhóm {groupCode}</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800"
            disabled={isLoading}
          >
            ✖
          </button>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="col-span-1 text-right">Trạng thái</label>
            <Select
              value={mentorDecision}
              onValueChange={(value) => {
                setMentorDecision(value as "PASS" | "NOT_PASS");
                if (value === "NOT_PASS") setDefenseRound(null);
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PASS">Đạt</SelectItem>
                <SelectItem value="NOT_PASS">Không đạt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mentorDecision === "PASS" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="col-span-1 text-right">Vòng bảo vệ</label>
              <Select
                value={defenseRound?.toString()}
                onValueChange={(value) => setDefenseRound(Number(value))}
                disabled={isLoading}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Vòng 1</SelectItem>
                  <SelectItem value="2">Vòng 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Đang lưu..." : "Xác nhận"}
          </Button>
        </div>
      </div>
    </div>
  );
};