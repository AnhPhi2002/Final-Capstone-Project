import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
export const DeleteSemester: React.FC<{ semesterId: string }> = ({ semesterId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    console.log(`Deleting semester ${semesterId}`); // Thay thế bằng logic xóa thực tế
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem>xóa</DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa học kỳ này?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Học kỳ sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
