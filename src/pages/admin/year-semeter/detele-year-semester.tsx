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
};

export const DeteleYearSemester: React.FC<DeteleYearSemesterProps> = ({ yearId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteYear(yearId)).unwrap();
      toast.success("Xóa thành công!");
      dispatch(fetchYears({ page: 1, pageSize: 9 })); // Reload danh sách
    } catch (error) {
      toast.error("Xóa thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" >
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
