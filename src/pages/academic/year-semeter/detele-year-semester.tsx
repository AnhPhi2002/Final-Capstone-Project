import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { deleteYear, fetchYears } from "@/lib/api/redux/yearSlice";
import { Toaster, toast } from "sonner";

type DeteleYearSemesterProps = {
  yearId: string;
  onDeleteSuccess?: (yearId: string) => void; // Callback để cập nhật state cục bộ nếu cần
};

export const DeteleYearSemester: React.FC<DeteleYearSemesterProps> = ({ yearId, onDeleteSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteYear(yearId)).unwrap();
      toast.success("Xóa thành công!");
      if (onDeleteSuccess) {
        onDeleteSuccess(yearId); // Gọi callback nếu có để cập nhật state cục bộ
      } else {
        dispatch(fetchYears()); // Làm mới danh sách nếu không dùng state cục bộ
      }
    } catch (error) {
      toast.error("Xóa thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            Xóa
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
