import { ColumnDef } from "@tanstack/react-table";
import { SubmissionRound } from "@/types/deadline-topic";
import { useNavigate } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<SubmissionRound>[] = [
  {
    accessorKey: "round_number",
    header: "Lần nộp",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "start_date",
    header: "Ngày bắt đầu",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "end_date",
    header: "Ngày kết thúc",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const round = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(round.id.toString());
                toast.success("Đã sao chép ID vòng nộp.");
              }}
            >
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/deadine-topic/${round.semester_id}/round/${round.round_number}`)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/deadine-topic/${round.semester_id}/round/${round.round_number}/edit`)} >
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={() => toast.error("Xóa vòng nộp chưa được hỗ trợ")}>
              Xóa vòng nộp
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
