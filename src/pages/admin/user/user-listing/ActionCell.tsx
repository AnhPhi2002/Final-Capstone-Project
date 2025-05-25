import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/lib/api/redux/userSlice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

interface ActionCellProps {
  userId: string;
}

const ActionCell: React.FC<ActionCellProps> = ({ userId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      const result = await dispatch(deleteUser(userId) as any);
      if (deleteUser.fulfilled.match(result)) {
        toast.success("Xóa tài khoản thành công");
      } else {
        toast.error(result.payload || "Xóa tài khoản thất bại");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(userId);
            toast("Đã sao chép.");
          }}
        >
          Sao chép ID tài khoản
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/admin/user/${userId}`}>Xem chi tiết tài khoản</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/admin/user/update-user/${userId}/edit`}>Cập nhật thông tin</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Thay đổi trạng thái</DropdownMenuSubTrigger>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
          Xóa tài khoản
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
