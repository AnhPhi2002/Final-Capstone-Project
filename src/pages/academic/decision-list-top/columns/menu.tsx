import { FilePlus, FilePenLine } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useState } from "react";

export const Menu = ({
  semesterId,
  decisionId,
}: {
  semesterId: string;
  decisionId?: string;
}) => {
  // const [setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Quản lý quyết định</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-34">
          <DropdownMenuLabel>Quyết định học kỳ</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            {decisionId ? (
              <span className="text-gray-400 cursor-not-allowed flex items-center">
                <FilePlus className="mr-2 h-4 w-4" />
                <span>Tạo bảng (Đã có quyết định)</span>
              </span>
            ) : (
              <Link to={`/academic/decision-list-top/${semesterId}/create`}>
                <FilePlus className="mr-2 h-4 w-4" />
                <span>Tạo bảng</span>
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {decisionId ? (
              <Link to={`/academic/decision-list-top/${semesterId}/update`}>
                <FilePenLine className="mr-2 h-4 w-4" />
                <span>Chỉnh sửa</span>
              </Link>
            ) : (
              <span className="text-gray-400 cursor-not-allowed flex items-center">
                <FilePenLine className="mr-2 h-4 w-4" />
                <span>Chỉnh sửa (Chưa có quyết định)</span>
              </span>
            )}
          </DropdownMenuItem>
          {/* {decisionId && (
            <DropdownMenuItem onClick={() => setOpenDelete(true)}>
              <FilePenLine className="mr-2 h-4 w-4" />
              <span>Xóa bảng</span>
            </DropdownMenuItem>
          )} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Menu;