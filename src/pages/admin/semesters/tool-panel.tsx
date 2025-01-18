import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ToolPanel({ table }: { table: any }) {
  const handleSemesterFilter = (value: string) => {
    table.getColumn("code")?.setFilterValue?.(value === "all" ? "" : value);
  };

  return (
    <div className="flex items-center py-4">
      {/* Input Filter */}
      <Input
        placeholder="Filter semesters..."
        value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("code")?.setFilterValue?.(event.target.value)
        }
        className="max-w-sm"
      />

      {/* Dropdown Menu & Select ở bên phải */}
      <div className="ml-auto flex items-center space-x-4">
        {/* Dropdown Menu */}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Select */}
  
      </div>
    </div>
  );
}
