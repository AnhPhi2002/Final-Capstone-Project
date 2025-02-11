import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type ActionProps = {
  semesterId: string;
};

export const ActionMenu: React.FC<ActionProps> = ({ semesterId }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(semesterId)}
        >
          Copy Semester ID
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => console.log(`Delete semester ${semesterId}`)}
        >
          Delete Semester
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
