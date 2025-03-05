import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Lecturer } from "@/types/Lecturer";
import { DeleteReviewTopicCouncil } from "./delete-review-topic-council";
import { UpdateReviewTopicCouncil } from "./update-review-topic-council";

type ActionMenuProps = {
  lecturer: Lecturer;
};

export const ActionMenu: React.FC<ActionMenuProps> = ({ lecturer }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

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
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>Cập nhật giảng viên</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            Xóa giảng viên
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteReviewTopicCouncil open={openDelete} setOpen={setOpenDelete} lecturerId={lecturer.id} />
      <UpdateReviewTopicCouncil open={openUpdate} setOpen={setOpenUpdate} lecturer={lecturer} />
    </>
  );
};
