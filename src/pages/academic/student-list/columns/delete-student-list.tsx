import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { deleteAllStudentsBySemester } from "@/lib/api/redux/studentSlice";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteStudentListProps {
  semesterId?: string;
}

export const DeleteStudentList: React.FC<DeleteStudentListProps> = ({ semesterId }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.students);
  const [open, setOpen] = useState(false);

  const handleDeleteAll = async () => {
    if (!semesterId) {
      toast.error("Không tìm thấy học kỳ.");
      return;
    }

    try {
      await dispatch(deleteAllStudentsBySemester(semesterId)).unwrap();
      toast.success("Xóa tất cả sinh viên thành công!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Xóa tất cả sinh viên thất bại!");
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button disabled={loading}>{loading ? "Đang xóa..." : "Xóa tất cả"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa tất cả sinh viên?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn tất cả sinh viên trong học kỳ này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDeleteAll} disabled={loading} variant="destructive">
              {loading ? "Đang xóa..." : "Tiếp tục"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
