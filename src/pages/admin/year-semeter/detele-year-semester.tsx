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
export const DeteleYearSemester = () => {
  return (
    <div> <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        size="sm"
        // className="bg-red-500 hover:bg-red-600 text-white"
      >
        Xóa
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Bạn có chắc chắn muốn xóa?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh
          viễn.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Hủy</AlertDialogCancel>
        <AlertDialogAction>Xác nhận</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
  )
}
