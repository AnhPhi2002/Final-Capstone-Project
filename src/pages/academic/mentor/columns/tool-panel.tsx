import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router";
// import SendMailButton from "./send-mail-button";

interface ToolPanelProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ToolPanel = ({ searchTerm, setSearchTerm }: ToolPanelProps) => {
  const { semesterId } = useParams<{ semesterId: string }>();

  return (
    <div className="flex justify-between items-center pb-5 gap-4">
      <Input
        placeholder="Tìm kiếm..."
        className="w-[300px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-4 ml-auto">
        <Link to={`/academic/import-mentor/${semesterId}`}>
          <Button className="flex gap-2 items-center">Import danh sách</Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolPanel;