import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "react-router";
import SendMailButton from "./send-mail-button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { deleteAllStudentsBySemester } from "@/lib/api/redux/studentSlice";
import { toast } from "sonner";


const ToolPanel = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.students);

  const handleDeleteAll = async () => {
    if (!semesterId) return;
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tất cả sinh viên?");
    if (!confirmDelete) return;

    try {
      await dispatch(deleteAllStudentsBySemester(semesterId)).unwrap();
      toast.success("Xóa tất cả sinh viên thành công!");
    } catch (error: any) {
      toast.error(error || "Xóa tất cả sinh viên thất bại!");
    }
  };
  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input placeholder="Nhập để tìm kiếm" />
        <Button onClick={handleDeleteAll} disabled={loading}>
          {loading ? "Đang xóa..." : "Xóa tất cả"}
        </Button>
      </div>

      <div className="col-span-3">
        {semesterId && <SendMailButton semesterId={semesterId} />}
      </div>
      <div className="col-span-3">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Trạng thái sinh viên" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Tất cả</SelectItem>
            <SelectItem value="Qualified">Đạt</SelectItem>
            <SelectItem value="Not Qualified">Không đạt</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex">
        <Link to={`/import-student/${semesterId}`} className="w-full">
          <Button className="w-full flex gap-3 items-center">Import</Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolPanel;
