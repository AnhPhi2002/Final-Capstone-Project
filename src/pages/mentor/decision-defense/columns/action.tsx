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
import { ReviewSchedule } from "@/lib/api/types";
// import { ViewScoreModal } from "./view-score-modal";
import { Decision } from "./decision"; // Import Decision

type ActionProps = {
  schedule: ReviewSchedule;
  refetchData?: () => void;
};

export const Action: React.FC<ActionProps> = ({ schedule, refetchData }) => {
  const [openDecision, setOpenDecision] = useState(false);

  const handleOpenDecision = () => setOpenDecision(true);
  const handleCloseDecision = () => setOpenDecision(false);

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
          <DropdownMenuItem onClick={handleOpenDecision}>
            Xác nhận vòng bảo vệ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openDecision && (
        <Decision
          schedule={schedule}
          open={openDecision}
          setOpen={handleCloseDecision}
          refetchData={refetchData}
        />
      )}
    </>
  );
};

