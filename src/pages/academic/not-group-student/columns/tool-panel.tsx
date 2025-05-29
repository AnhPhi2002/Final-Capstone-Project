import { Input } from "@/components/ui/input";
import SendMailButton from "./send-mail-button";
import { useParams } from "react-router";

interface ToolPanelProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ToolPanel = ({ searchTerm, setSearchTerm }: ToolPanelProps) => {
  const { semesterId } = useParams<{ semesterId: string }>();
  return (
    <div className="flex items-center pb-5 gap-5">
      <Input
        placeholder="Nhập để tìm kiếm"
        className="w-[300px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="ml-auto">
        {semesterId && <SendMailButton semesterId={semesterId} />}
      </div>
    </div>
  );
};

export default ToolPanel;

