// src/components/action.tsx
import React from "react";
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
import { CouncilReview } from "@/lib/api/types";
import { useNavigate, useParams } from "react-router";
// import { DeleteReviewTopicCouncil } from "./delete-review-topic-council";
// import { UpdateReviewTopicCouncil } from "./update-review-topic-council";

type ActionMenuProps = {
  council: CouncilReview;
  refetchData?: () => void;
};

// export const ActionMenu: React.FC<ActionMenuProps> = ({ council, refetchData }) => {
//   const navigate = useNavigate();
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const { semesterId } = useParams();

  export const ActionMenu: React.FC<ActionMenuProps> = ({ council }) => {
    const navigate = useNavigate();
    // const [openUpdate, setOpenUpdate] = useState(false);
    // const [openDelete, setOpenDelete] = useState(false);
    const { semesterId } = useParams();

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
          {/* <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            Cập nhật Hội đồng
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => navigate(`/lecturer/council-review-member/${council.id}/${semesterId}`)}
          >
            Thành viên hội đồng
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            Xóa Hội đồng
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <DeleteReviewTopicCouncil
  open={openDelete}
  setOpen={setOpenDelete}
  councilId={council.id}
  refetchData={refetchData} // Gọi lại danh sách sau khi xóa
/>


      {openUpdate && (
        <UpdateReviewTopicCouncil
          open={openUpdate}
          setOpen={setOpenUpdate}
          council={council}
          refetchData={refetchData}
        />
      )} */}
    </>
  );
};