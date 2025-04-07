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
import { ScoreModal } from "./score-modal";
import { ViewScoreModal } from "./view-score-modal";

type ActionProps = {
  schedule: DefenseSchedule;
  semesterId: string;
};

export const Action: React.FC<ActionProps> = ({ schedule, semesterId }) => {
  const [openScore, setOpenScore] = useState(false);
  const [viewScore, setViewScore] = useState(false);

  const handleOpenScore = () => {
    setTimeout(() => setOpenScore(true), 0);
  };

  const handleViewScore = () => {
    setTimeout(() => setViewScore(true), 0);
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
          <DropdownMenuItem onClick={handleOpenScore}>Chấm điểm</DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewScore}>Xem điểm</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ScoreModal open={openScore} setOpen={setOpenScore} session={schedule} semesterId={semesterId} />
      <ViewScoreModal open={viewScore} setOpen={setViewScore} scheduleId={schedule.id} />
    </>
  );
};
