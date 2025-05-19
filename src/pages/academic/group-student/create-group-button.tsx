import { useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  createGroupForAcademic,
  // createInterMajorGroupForAcademic,
  fetchGroupsBySemester,
} from "@/lib/api/redux/groupSlice";
import { fetchInterMajorConfigs } from "@/lib/api/redux/interMajorSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {createInterMajorGroupForAcademic} from "@/lib/api/redux/interMajorGroupSlice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  semesterId: string;
  students: { email: string; studentCode: string }[];
}

const ManualCreateGroupDialog: React.FC<Props> = ({ semesterId, students }) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [groupType, setGroupType] = useState<"normal" | "inter">("normal");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedInterMajorId, setSelectedInterMajorId] = useState("");
  const [loading, setLoading] = useState(false);

  const interMajors = useAppSelector((state) => state.interMajor.data);

  useEffect(() => {
    if (groupType === "inter") {
      dispatch(fetchInterMajorConfigs({ semesterId }));
    }
  }, [dispatch, groupType, semesterId]);

  const handleCreate = useCallback(async () => {
    if (!selectedEmail) {
      toast.error("Vui lòng chọn trưởng nhóm");
      return;
    }

    if (groupType === "inter" && !selectedInterMajorId) {
      toast.error("Vui lòng chọn liên kết liên ngành");
      return;
    }

    try {
      setLoading(true);

      if (groupType === "normal") {
        await dispatch(
          createGroupForAcademic({ leaderEmail: selectedEmail, semesterId })
        ).unwrap();
        toast.success("Tạo nhóm thủ công thành công");
      } else {
        await dispatch(
          createInterMajorGroupForAcademic({
            leaderEmail: selectedEmail,
            majorPairConfigId: selectedInterMajorId,
          })
        ).unwrap();
        toast.success("Tạo nhóm liên ngành thủ công thành công");
      }

      await dispatch(fetchGroupsBySemester(semesterId));
      setSelectedEmail("");
      setSelectedInterMajorId("");
      setIsOpen(false);
    } catch (err) {
      toast.error(`Lỗi: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedEmail, selectedInterMajorId, groupType, semesterId]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedEmail("");
      setSelectedInterMajorId("");
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Tạo nhóm thủ công</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Tạo nhóm KLTN thủ công
          </DialogTitle>
        </DialogHeader>

        {/* Chọn loại nhóm */}
        <div>
          <Label>Loại nhóm</Label>
          <RadioGroup
            value={groupType}
            onValueChange={(val) => setGroupType(val as any)}
            className="flex gap-4 mt-2"
          >
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

        {/* Chọn trưởng nhóm */}
        <div>
          <Label>Chọn trưởng nhóm:</Label>
          <Select value={selectedEmail} onValueChange={setSelectedEmail} disabled={loading}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Chọn sinh viên..." />
            </SelectTrigger>
            <SelectContent>
              {students.length > 0 ? (
                students.map((student) => (
                  <SelectItem
                    key={student.studentCode}
                    value={student.email}
                  >
                    {student.email} ({student.studentCode})
                  </SelectItem>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Không có sinh viên
                </div>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Chọn liên kết nếu là nhóm liên ngành */}
        {groupType === "inter" && (
          <div>
            <Label>Chọn liên kết liên ngành</Label>
            <Select value={selectedInterMajorId} onValueChange={setSelectedInterMajorId}>
              <SelectTrigger className="w-full mt-1">
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

        <DialogFooter>
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Đang tạo nhóm..." : "Tạo nhóm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCreateGroupDialog;
