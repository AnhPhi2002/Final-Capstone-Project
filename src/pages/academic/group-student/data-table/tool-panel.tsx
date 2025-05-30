
import { Input } from "@/components/ui/input";

interface ToolPanelProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ToolPanel = ({ searchTerm, setSearchTerm }: ToolPanelProps) => {

  return (
    <div className="flex justify-between items-center  gap-4 ">
      <Input
        placeholder="Tìm kiếm..."
        className="w-[300px] "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ToolPanel;