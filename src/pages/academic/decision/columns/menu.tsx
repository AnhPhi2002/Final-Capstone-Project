import {

  FilePlus,
  FilePenLine,
} from "lucide-react"

import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Menu = ({ semesterId }: { semesterId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Quản lý quyết định </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-34">
        <DropdownMenuLabel>Quyết định học kỳ</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* 2 mục có link điều hướng */}
        <DropdownMenuItem asChild>
          <Link to={`/academic/decision/${semesterId}/create`}>
            <FilePlus className="mr-2 h-4 w-4" />
            <span>Tạo</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/academic/decision/${semesterId}/update`}>
            <FilePenLine className="mr-2 h-4 w-4" />
            <span>Chỉnh sửa</span>
          </Link>
        </DropdownMenuItem>

      
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
