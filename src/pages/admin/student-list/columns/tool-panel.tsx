import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "react-router";
import SendMailButton from "./send-mail-button";

const ToolPanel = () => {
  const { studentId } = useParams<{ studentId: string }>();

  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input placeholder="Nhập để tìm kiếm" />
        <Button>
          Xóa tất cả
        </Button>
      </div>

      <div className="col-span-3">
        <SendMailButton />
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
        <Link to={`/import-student/${studentId}`} className="w-full">
          <Button className="w-full flex gap-3 items-center">Import</Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolPanel;
