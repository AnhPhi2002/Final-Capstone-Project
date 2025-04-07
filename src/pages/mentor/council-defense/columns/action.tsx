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
import { CouncilDefense } from "@/lib/api/redux/types/defenseSchedule";
import { useNavigate, useParams } from "react-router";

type ActionMenuProps = {
  council: CouncilDefense;
  refetchData?: () => void;
};

export const ActionMenu: React.FC<ActionMenuProps> = ({ council }) => {
  const navigate = useNavigate();
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
          <DropdownMenuItem
            onClick={() => navigate(`/lecturer/council-defense-member/${council.id}/${semesterId}`)}
          >
            Thành viên hội đồng
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/lecturer/council-defense-group/${council.id}/${semesterId}`)}
          >
            Thông tin nhóm bảo vệ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};