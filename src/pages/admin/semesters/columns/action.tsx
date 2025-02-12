import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { UpdateSemester } from "./update-semester"; // Chỉnh lại đường dẫn nếu cần
import { DeleteSemester } from "./detele-semester"; // Chỉnh lại đường dẫn nếu cần
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Thư viện shadcn/ui

type ActionProps = {
  semesterId: string;
};

export const ActionMenu: React.FC<ActionProps> = ({ semesterId }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCopySemesterId = async () => {
    try {
      await navigator.clipboard.writeText(semesterId);
      alert("Đã sao chép mã học kỳ vào clipboard!");
    } catch {
      alert("Sao chép mã học kỳ thất bại.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopySemesterId}>
            Sao chép mã học kỳ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            Cập nhật học kỳ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            Xóa học kỳ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    
      {openUpdate && <UpdateSemester open={openUpdate} setOpen={setOpenUpdate} semesterId={semesterId} />}
      
    
      {openDelete && <DeleteSemester open={openDelete} setOpen={setOpenDelete} semesterId={semesterId} />}
    </>
  );
};
