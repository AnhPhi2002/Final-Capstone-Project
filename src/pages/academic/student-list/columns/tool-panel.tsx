import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "react-router";
import SendMailButton from "./send-mail-button";
import { DeleteStudentList } from "./delete-student-list";
interface ToolPanelProps {
  onFilterChange: (value: string) => void;
  onSearchChange: (text: string) => void;
}
const ToolPanel = ({ onFilterChange, onSearchChange }: ToolPanelProps) => {
  const { semesterId } = useParams<{ semesterId: string }>();

  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
      <Input
          placeholder="Nhập để tìm kiếm"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <DeleteStudentList semesterId={semesterId} />
      </div>

      <div className="col-span-3">
        {semesterId && <SendMailButton semesterId={semesterId} />}
      </div>
    

      <div className="col-span-3">
        <Select onValueChange={onFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Trạng thái sinh viên" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Tất cả</SelectItem>
            <SelectItem value="qualified">Đủ điều kiện</SelectItem>
            <SelectItem value="not-qualified">Không đủ điều kiện</SelectItem>
            <SelectItem value="block-3">Block 3</SelectItem>
            <SelectItem value="block-10">Block 10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex">
        <Link to={`/academic/import-student/${semesterId}`} className="w-full">
          <Button className="w-full flex gap-3 items-center">Import</Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolPanel;
