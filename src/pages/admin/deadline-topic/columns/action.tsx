import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { deleteSubmissionRound } from "@/lib/api/redux/submissionRoundSlice";
import { AppDispatch } from "@/lib/api/redux/store";
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

type ActionMenuProps = {
  round: {
    id: string;
    semesterId: string;
    roundNumber: number;
    description: string;
    startDate: string;
    endDate: string;
  };
};

export const Action: React.FC<ActionMenuProps> = ({ round }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteSubmissionRound(round.id)).unwrap();
      toast.success("Vòng nộp đã được xóa thành công!");
      setOpenDelete(false);
    } catch (error: any) {
      toast.error(`Xóa thất bại: ${error.message || "Đã xảy ra lỗi"}`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>Cập nhật vòng nộp</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            Xóa vòng nộp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openUpdate && <UpdateDeadlineTopic open={openUpdate} setOpen={setOpenUpdate} round={round} />}
      {openDelete && <DeleteDeadlineTopic open={openDelete} setOpen={setOpenDelete} roundId={round.id} />}
    </>
  );
};
