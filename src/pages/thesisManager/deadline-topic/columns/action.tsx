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
import { UpdateDeadlineTopic } from "./update-deadline-topic";
import { DeleteDeadlineTopic } from "./delete-deadline-topic";
import { useNavigate } from "react-router";

type ActionMenuProps = {
  round: {
    id: string;
    semesterId: string;
    roundNumber: number;
    description: string;
    startDate: string;
    endDate: string;
    type: "TOPIC" | "CHECK-TOPIC" | "REVIEW" | "DEFENSE";
  };
  setSelectedYear: (yearId: string) => void;
  setSelectedSemester: (semesterId: string) => void;
};

export const Action: React.FC<ActionMenuProps> = ({
  round,
  setSelectedYear,
  setSelectedSemester,
}) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
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
      {openDelete && (
        <DeleteDeadlineTopic
          open={openDelete}
          setOpen={setOpenDelete}
          roundId={round.id}
          semesterId={round.semesterId}
          onDeleted={(yearId, semesterId) => {
            setSelectedYear(yearId);
            setSelectedSemester(semesterId);
            navigate("/graduation-thesis/deadline-topic", {
              state: {
                yearId,
                semesterId,
              },
            });
          }}
        />
      )}
    </>
  );
};
