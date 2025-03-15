// src/components/action.tsx
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
import { Council, CouncilMember } from "@/lib/api/types"; // Thêm CouncilMember
import { useNavigate } from "react-router";
import { DeleteReviewTopicCouncilMember } from "./delete-council-member";

// Kiểu dữ liệu linh hoạt cho cả Council và CouncilMember
export interface ActionMenuProps {
  data: Council | CouncilMember;
  refetchData: () => void;
}
export const ActionMenuMember: React.FC<ActionMenuProps> = ({ data, refetchData }) => {
  const navigate = useNavigate();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Kiểm tra xem data là Council hay CouncilMember
  const isCouncil = "members" in data; // Council có thuộc tính members, CouncilMember thì không

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
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            {isCouncil ? "Cập nhật Hội đồng" : "Cập nhật Thành viên"}
          </DropdownMenuItem>
          {isCouncil && ( // Chỉ hiển thị cho Council
            <DropdownMenuItem
              onClick={() => navigate(`/examination/review-topic-council-member/${data.id}`)}
            >
              Thành viên hội đồng
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            {isCouncil ? "Xóa Hội đồng" : "Xóa Thành viên"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openDelete && (
        <DeleteReviewTopicCouncilMember
          open={openDelete}
          setOpen={setOpenDelete}
          lecturerId={data.id} // Truyền ID của Council hoặc CouncilMember
        />
      )}
    </>
  );
};