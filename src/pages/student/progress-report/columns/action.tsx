import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";

const Action = ({ report, onUpdateClick }: { report: ProgressReport; onUpdateClick: (report: ProgressReport) => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(report.id)}>
          Sao chép ID báo cáo
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/student/progress-report/${report.id}`}>Xem chi tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onUpdateClick(report)}>
          Cập nhật báo cáo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;