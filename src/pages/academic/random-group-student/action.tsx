
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
import { Link, useParams } from "react-router";
import { toast } from "sonner";

export const Action = ({ group }: { group: any }) => {
  const {semesterId} = useParams();
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
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(group.id.toString());
            toast("Đã sao chép Mã Nhóm.");
          }}
        >
          Sao Chép Mã Nhóm
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/academic/group-student-detail/${group.id}/${semesterId}`}>Xem Chi Tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/academic/group/${group.id}/edit`}>Chỉnh Sửa Nhóm</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">Xóa Nhóm</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
