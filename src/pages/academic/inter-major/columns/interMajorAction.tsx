import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import {
  deleteInterMajorConfig,
  fetchInterMajorById,
  updateInterMajorConfig,
} from "@/lib/api/redux/interMajorSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Dialog,

  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
  row: {
    id: string;
    name: string;
    semesterId: string;
    firstMajorId: string;
    secondMajorId: string;
    isActive: boolean;
  };
}

export const InterMajorAction = ({ row }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(row.name);

  const handleCopy = () => {
    navigator.clipboard.writeText(row.id);
    toast.success("Đã sao chép ID liên ngành");
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteInterMajorConfig(row.id)).unwrap();
      toast.success("Xóa liên ngành thành công");
      navigate("/academic/inter-major");
    } catch (err) {
      toast.error(`Lỗi khi xóa: ${err}`);
    }
  };

  const handleUpdate = async () => {
    try {
      await dispatch(
        updateInterMajorConfig({
          id: row.id,
          name,
          semesterId: row.semesterId,
          firstMajorId: row.firstMajorId,
          secondMajorId: row.secondMajorId,
          isActive: row.isActive,
        })
      ).unwrap();
      toast.success("Cập nhật thành công");
      setEditOpen(false);
      dispatch(fetchInterMajorById({ id: row.id }));
    } catch (err) {
      toast.error(`Lỗi khi cập nhật: ${err}`);
    }
  };

  return (
    <>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopy}>
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              Cập nhật
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tên liên ngành</DialogTitle>
          </DialogHeader>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 focus:ring-blue-500"
          />
          <DialogFooter className="mt-4">
            <Button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
