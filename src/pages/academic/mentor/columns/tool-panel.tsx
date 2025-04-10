import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
// import SendMailButton from "./send-mail-button";

const ToolPanel = () => {
  const { semesterId } = useParams<{ semesterId: string }>();

  return (
    <div className="flex justify-end pb-5">
      <div className="flex flex-wrap items-center gap-4 ml-auto">
        {/* {semesterId && <SendMailButton semesterId={semesterId} />} */}
        <Link to={`/academic/import-mentor/${semesterId}`}>
          <Button className="flex gap-2 items-center">
            Import danh sách
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolPanel;
