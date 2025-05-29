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
import { toast, Toaster } from "sonner";
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(row.name);

  const handleCopy = () => {
    navigator.clipboard.writeText(row.id);
    toast.success("Đã sao chép ID liên ngành");
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteInterMajorConfig(row.id)).unwrap();
      toast.success("Xóa liên ngành thành công");
      setDeleteOpen(false);
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
      <Toaster position="top-right" richColors duration={3000} />

      {/* Dropdown action menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopy}>Sao chép ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>Cập nhật</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500" onClick={() => setDeleteOpen(true)}>
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal cập nhật */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
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
            <Button onClick={handleUpdate}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal xác nhận xóa */}
      {deleteOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/80" onClick={() => setDeleteOpen(false)} />
          <div
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95
        data-[state=closed]:slide-out-to-left-1/2
        data-[state=closed]:slide-out-to-top-[48%]
        data-[state=open]:slide-in-from-left-1/2
        data-[state=open]:slide-in-from-top-[48%]
        sm:rounded-lg`}
        onClick={(e) => e.stopPropagation()}
        data-state={deleteOpen ? "open" : "closed"}

      >
            <h2 className="text-lg font-semibold mb-2">Xác nhận xóa liên ngành?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Hành động này không thể hoàn tác. Liên ngành sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                Hủy
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>
                Xác nhận
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
