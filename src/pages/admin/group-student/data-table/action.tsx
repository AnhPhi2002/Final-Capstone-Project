import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";


export const Action = ({ group }: { group: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Hành Động</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(group.id)}>
          Sao Chép Mã Nhóm
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/group-student-detail/${group.id}`}>Xem Chi Tiết</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Link to={`/group-student-detail/${group.id}`}>Mời vào nhom</Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link to={`/group/${group.id}/edit`}>Chỉnh Sửa Nhóm</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">Xóa Nhóm</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
