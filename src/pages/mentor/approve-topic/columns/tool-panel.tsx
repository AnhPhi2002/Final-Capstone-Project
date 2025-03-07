import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { AddReviewTopicCouncil } from "./add-review-topic-council";

export function ToolPanel({ table }: { table: any }) {
  const handleSemesterFilter = (value: string) => {
    table.getColumn("code")?.setFilterValue?.(value === "all" ? "" : value);
  };

  return (
    <div className=" mb-6 flex items-center">
      <div className="ml-auto flex items-center space-x-4"> 
        <div> 
        {/* <AddReviewTopicCouncil /> */}
        </div>
        
        <div> 
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
    </div>
  );
}
