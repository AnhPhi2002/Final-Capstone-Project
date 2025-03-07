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
import { Council } from "@/lib/api/types";
import { DeleteReviewTopicCouncil } from "./delete-review-topic-council";
import { UpdateReviewTopicCouncil } from "./update-review-topic-council";
import { useNavigate } from "react-router"; // Import hook điều hướng

type ActionMenuProps = {
  council: Council;
};

export const ActionMenu: React.FC<ActionMenuProps> = ({ council }) => {
  const navigate = useNavigate();
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
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>Cập nhật Hội đồng</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/review-topic-council-member/${council.id}`)}>Thành viên hội đồng</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            Xóa Hội đồng
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <DeleteReviewTopicCouncil open={openDelete} setOpen={setOpenDelete} councilId={council.id} /> */}
      <UpdateReviewTopicCouncil open={openUpdate} setOpen={setOpenUpdate} council={council} />
    </>
  );
};
