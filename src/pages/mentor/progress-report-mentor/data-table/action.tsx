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
import { Link, useParams } from "react-router";
import { ProgressReport } from "@/lib/api/redux/types/progressReport";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { deleteReportPeriod } from "@/lib/api/redux/mentorProgressReportSlice";
import { toast } from "sonner";

export const Action = ({ report }: { report: ProgressReport }) => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    if (!semesterId) return;
    try {
      await dispatch(deleteReportPeriod({ reportId: report.id, semesterId })).unwrap();
      toast.success("Xóa lịch báo cáo thành công!");
    } catch (error: any) {
      toast.error(error || "Lỗi khi xóa lịch báo cáo!");
    }
  };

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
        <DropdownMenuItem>
          <Link to={`/lecturer/progress-report-mentor/${semesterId}/detail/${report.id}`}>
            Xem chi tiết
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Xóa lịch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
