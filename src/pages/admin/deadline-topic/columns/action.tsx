import React, { useState } from "react";
import { useNavigate } from "react-router"; // ✅ Sửa lỗi import từ react-router
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UpdateDeadlineTopic } from "./update-deadline-topic";
import { DeleteDeadlineTopic } from "./delete-deadline-topic";


type SubmissionRound = {
  id: string;
  semester_id: string;
  round_number: number;
};

type ActionMenuProps = {
  round: SubmissionRound;
  refetchData?: () => void;
};

export const Action: React.FC<ActionMenuProps> = ({ round, refetchData }) => {
  const navigate = useNavigate();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCopyId = async () => {
    try {
      if (!round?.id) throw new Error("Không tìm thấy ID");
      await navigator.clipboard.writeText(round.id);
      toast.success("Đã sao chép ID vòng nộp.");
    } catch {
      toast.error("Sao chép ID thất bại.");
    }
  };

  const handleCopySemesterId = async () => {
    try {
      if (!round?.semester_id) throw new Error("Không tìm thấy mã học kỳ");
      await navigator.clipboard.writeText(round.semester_id);
      toast.success("Đã sao chép mã học kỳ.");
    } catch {
      toast.error("Sao chép mã học kỳ thất bại.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyId}>Sao chép ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopySemesterId}>
            Sao chép mã học kỳ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            Cập nhật hạn nộp
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDelete(true)}
            className="text-red-600"
          >
            Xóa hạn nộp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hiển thị UpdateDeadlineTopic khi openUpdate = true */}
      {openUpdate && (
        <UpdateDeadlineTopic
          open={openUpdate}
          setOpen={setOpenUpdate}
          topicId={round.id} // ✅ Đảm bảo đúng topicId
          refetchData={refetchData}
        />
      )}

      {/* Hiển thị DeleteDeadlineTopic khi openDelete = true */}
      {openDelete && (
        <DeleteDeadlineTopic
          open={openDelete}
          setOpen={setOpenDelete}
          topicId={round.id} // ✅ Đảm bảo đúng topicId
        />
      )}
    </>
  );
};
