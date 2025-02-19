import { Button } from "@/components/ui/button";

import { Link, useParams } from "react-router";

const ToolPanel = () => {
  const { semesterId } = useParams<{ semesterId: string }>();

  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
      
      </div>

      <div className="col-span-3"></div>
      <div className="col-span-3"></div>
      <div className="col-span-2 flex">
     
          <Button className="w-full flex gap-3 items-center">Tạo đề tài </Button>
       
      </div>
    </div>
  );
};

export default ToolPanel;
