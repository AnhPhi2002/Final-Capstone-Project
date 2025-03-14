import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ApproveTopic } from "@/types/ApproveTopic";

type ActionMenuProps = {
  approvetopic: ApproveTopic;
};

export const ActionMenu: React.FC<ActionMenuProps> = ({  }) => {
  // const [openUpdate, setOpenUpdate] = useState<boolean>(false);

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
          <DropdownMenuSub>
          <DropdownMenuSubTrigger>Thay đổi vai trò</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem >Chấp nhận </DropdownMenuItem>
            <DropdownMenuItem >Từ chối </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
