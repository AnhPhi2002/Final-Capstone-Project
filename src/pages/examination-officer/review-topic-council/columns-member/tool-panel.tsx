import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddReviewMemberTopicCouncil } from "./add-council-member";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export function ToolPanel({
  table,
  councilId,
  refetchData,
  semesterId,
}: {
  table: any;
  councilId: string;
  refetchData: () => void;
  semesterId: string;
}) {
  const handleSemesterFilter = (value: string) => {
    table.getColumn("code")?.setFilterValue?.(value === "all" ? "" : value);
  };

  const handleBack = () => {
   
    window.history.back(); // hoặc navigate nếu bạn dùng React Router
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Nút quay lại bên trái */}
      <div>
        <Button onClick={handleBack}>
          <ArrowLeft /> Quay lại
        </Button>
      </div>

      {/* Các tool khác bên phải */}
      <div className="flex items-center space-x-4">
        <AddReviewMemberTopicCouncil
          councilId={councilId}
          refetchData={refetchData}
          semesterId={semesterId}
        />

        <Select onValueChange={handleSemesterFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Semesters</SelectLabel>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="Spring2025">Spring 2025</SelectItem>
              <SelectItem value="Summer2025">Summer 2025</SelectItem>
              <SelectItem value="Fall2025">Fall 2025</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
