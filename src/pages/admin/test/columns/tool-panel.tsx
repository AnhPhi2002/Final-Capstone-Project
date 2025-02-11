import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";

interface ToolPanelProps {
  setFilterStatus: (status: string) => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({ setFilterStatus }) => {
  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input placeholder="Nhập email để tìm kiếm" />
        <Button>
          <Search />
        </Button>
      </div>
      <div className="col-span-4">
        <Select onValueChange={(value) => setFilterStatus(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Trạng thái sinh viên" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Tất cả</SelectItem>
            <SelectItem value="Qualified">Đủ điều kiện</SelectItem>
            <SelectItem value="Pending">Chờ xét</SelectItem>
            <SelectItem value="Rejected">Bị loại</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ToolPanel;
