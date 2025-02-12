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
import { DeleteSemester } from "./detele-semester";

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
          Sao chép học kỳ ID
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log(`Delete semester ${semesterId}`)}
        >
          Cập nhật học kỳ
        </DropdownMenuItem>
       
          <DeleteSemester semesterId={semesterId} />
      
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
