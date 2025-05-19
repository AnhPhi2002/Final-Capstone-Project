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
import { deleteGroup, fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { toast } from "sonner";


export const Action = ({ group }: { group: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const semesterId = useParams<{ semesterId: string }>().semesterId as string;
  const handleDelete = async (groupId: string) => {
    try {
      await dispatch(deleteGroup(groupId)).unwrap();
      toast.success("Xóa nhóm thành công");
      dispatch(fetchGroupsBySemester(semesterId));
    } catch (err: any) {
      toast.error(err?.message || "Xóa nhóm thất bại");
    }
  };
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
          <Link to={`/academic/group-student-detail/${group.id}/${group.semesterId}`}>Xem Chi Tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(group.id)}>Xóa Nhóm</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
