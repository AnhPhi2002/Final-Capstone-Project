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

type DeteleYearSemesterProps = {
  yearId: string;
};

export const DeteleYearSemester: React.FC<DeteleYearSemesterProps> = ({ yearId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deleteYear(yearId)).unwrap();
      alert("Xóa thành công!");
      dispatch(fetchYears({ page: 1, pageSize: 9 })); // Reload danh sách
    } catch (error) {
      alert("Xóa thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
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
