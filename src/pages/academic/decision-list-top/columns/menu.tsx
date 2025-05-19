"use client";

import { FilePlus, FilePenLine } from "lucide-react";
import { Link } from "react-router"; // ✅ sửa lại đúng react-router-dom
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface MenuProps {
  semesterId: string;
  decisionId?: string;
}

export const Menu: React.FC<MenuProps> = ({ semesterId, decisionId }) => {
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const hasDecision = !!decisionId;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" aria-label="Quản lý quyết định">
            Quản lý quyết định
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Quyết định học kỳ</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Tạo bảng */}
          <Link
            to={`/academic/decision-list-top/${semesterId}/create`}
            className="flex items-center w-full hover:bg-gray-100"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Tạo bảng
          </Link>

          {/* Chỉnh sửa */}
          
          <DropdownMenuItem asChild>
            {hasDecision ? (
              <Link
                to={`/academic/decision-list-top/${semesterId}/${decisionId}/update`}
                className="flex items-center w-full hover:bg-gray-100"
              >
                <FilePenLine className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Link>
            ) : (
              <span className="text-gray-400 cursor-not-allowed flex items-center">
                <FilePenLine className="mr-2 h-4 w-4" />
                Chỉnh sửa (Chưa có quyết định)
              </span>
            )}
          </DropdownMenuItem>

          {/* Xoá */}
          {/* <DropdownMenuItem asChild>
            {hasDecision ? (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center w-full text-left hover:bg-gray-100"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
              </button>
            ) : (
              <span className="text-gray-400 cursor-not-allowed flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa (Chưa có quyết định)
              </span>
            )}
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal Xác nhận xóa */}
      {/* {isDeleteModalOpen && decisionId && (
        <DeleteDecisionListTopic
          decisionId={decisionId}
          semesterId={semesterId}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )} */}
    </>
  );
};
