import { useState, useCallback } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { createGroupForAcademic, fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

interface Props {
  semesterId: string;
  students: { email: string; studentCode: string }[];
}

const ManualCreateGroupDialog: React.FC<Props> = ({ semesterId, students }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    if (!selectedEmail) {
      toast.error("Vui lòng chọn trưởng nhóm");
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        createGroupForAcademic({ leaderEmail: selectedEmail, semesterId })
      ).unwrap();
      toast.success("Tạo nhóm thủ công thành công");
      await dispatch(fetchGroupsBySemester(semesterId));
      setSelectedEmail("");
      setIsOpen(false);
    } catch (err) {
      toast.error(`Lỗi: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [dispatch, selectedEmail, semesterId]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedEmail("");
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Tạo nhóm thủ công</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Tạo nhóm KLTN thủ công
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <label className="text-sm text-muted-foreground mb-2 block">
            Chọn trưởng nhóm:
          </label>
          <Select
            value={selectedEmail}
            onValueChange={setSelectedEmail}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
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