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
import { DefenseSchedule } from "@/lib/api/redux/types/defenseSchedule";
import { ViewScoreModal } from "./view-score-modal";

type ActionProps = {
  schedule: DefenseSchedule;
};

export const Action: React.FC<ActionProps> = ({ schedule }) => {
  const [openViewScore, setOpenViewScore] = useState(false);

  const handleOpenViewScore = () => {
    setTimeout(() => setOpenViewScore(true), 0);
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
          <DropdownMenuItem onClick={handleOpenViewScore}>
            Xem điểm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewScoreModal
        open={openViewScore}
        setOpen={setOpenViewScore}
        schedule={schedule}
      />
    </>
  );
};