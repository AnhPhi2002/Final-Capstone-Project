// CreateGroupDialogContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/api/redux/store";
import { createGroup, fetchGroupsWithoutSemester } from "@/lib/api/redux/groupSlice";
import { createInterMajorGroup } from "@/lib/api/redux/interMajorGroupSlice";
import { fetchInterMajorConfigsForStudent } from "@/lib/api/redux/interMajorSlice";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  semesterId?: string;
  onSuccess?: () => void;
}

const CreateGroupDialogContent: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [groupType, setGroupType] = useState<"normal" | "inter">("normal");
  const [selectedInterMajorId, setSelectedInterMajorId] = useState("");

  const interMajors = useSelector((state: RootState) => state.interMajor.data);

  useEffect(() => {
    if (groupType === "inter") {
      dispatch(fetchInterMajorConfigsForStudent());
    }
  }, [dispatch, groupType]);

  const handleCreateGroup = async () => {
    setLoading(true);
    try {
      if (groupType === "normal") {
        await dispatch(createGroup()).unwrap();
        toast.success("Tạo nhóm KLTN thành công!");
      } else {
        if (!selectedInterMajorId) {
          toast.error("Vui lòng chọn liên kết liên ngành");
          setLoading(false);
          return;
        }

        await dispatch(createInterMajorGroup({ majorPairConfigId: selectedInterMajorId })).unwrap();
        toast.success("Tạo nhóm liên ngành thành công!");
      }

      await dispatch(fetchGroupsWithoutSemester());
      onSuccess?.();
    } catch (error: any) {
      toast.error("Lỗi khi tạo nhóm: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Loại nhóm</Label>
        <RadioGroup value={groupType} onValueChange={(val) => setGroupType(val as any)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="normal" id="normal" />
            <Label htmlFor="normal">Nhóm thường</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="inter" id="inter" />
            <Label htmlFor="inter">Nhóm liên ngành</Label>
          </div>
        </RadioGroup>
      </div>

      {groupType === "inter" && (
        <div>
          <Label>Chọn liên kết liên ngành</Label>
          <Select value={selectedInterMajorId} onValueChange={setSelectedInterMajorId}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn liên ngành..." />
            </SelectTrigger>
            <SelectContent>
              {interMajors
                .filter((m) => !m.isDeleted)
                .map((config) => (
                  <SelectItem key={config.id} value={config.id}>
                    {config.name} ({config.firstMajor.name} & {config.secondMajor.name})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button onClick={handleCreateGroup} disabled={loading} className="w-full bg-black text-white hover:bg-gray-800">
        {loading ? "Đang tạo nhóm..." : "Tạo nhóm"}
      </Button>
    </div>
  );
};

export default CreateGroupDialogContent;
