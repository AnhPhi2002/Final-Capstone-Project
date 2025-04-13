"use client";

import { FilePlus, FilePenLine, Trash2 } from "lucide-react";
import { Link } from "react-router"; // Updated import to match React Router
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { DeleteDecisionListTopic } from "../delete-decision-list-topic";

interface MenuProps {
  semesterId: string;
  decisionId?: string;
}

export const Menu = ({ semesterId, decisionId }: MenuProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" aria-label="Quản lý quyết định">
            Quản lý quyết định
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-34">
          <DropdownMenuLabel>Quyết định học kỳ</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* TẠO */}
          <DropdownMenuItem asChild>
            {decisionId ? (
              <span className="text-gray-400 cursor-not-allowed flex items-center">
                <FilePlus className="mr-2 h-4 w-4" />
                <span>Tạo bảng (Đã có quyết định)</span>
              </span>
            ) : (
              <Link
                to={`/academic/decision-list-top/${semesterId}/create`}
                className="flex items-center w-full hover:bg-gray-100"
              >
                <FilePlus className="mr-2 h-4 w-4" />
                <span>Tạo bảng</span>
              </Link>
            )}
          </DropdownMenuItem>

          {/* CHỈNH SỬA */}
          <DropdownMenuItem asChild>
            {decisionId ? (
              <Link
                to={`/academic/decision-list-top/${semesterId}/${decisionId}/update`}
                className="flex items-center w-full hover:bg-gray-100"
              >
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

          {/* XOÁ */}
          <DropdownMenuItem asChild>
            {decisionId ? (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center w-full text-left hover:bg-gray-100"
                aria-label="Xóa quyết định"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Xóa</span>
              </button>
            ) : (
              <span className="text-gray-400 cursor-not-allowed flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Xóa (Chưa có quyết định)</span>
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && decisionId && (
        <DeleteDecisionListTopic
          decisionId={decisionId}
          semesterId={semesterId}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};