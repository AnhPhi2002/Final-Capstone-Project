import Header from "@/components/header";
import DecisionView from "./decision-view";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";

export const DecisionDetail = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  
  console.log("semesterId:", semesterId); // Đã thấy log này
  const updateLink = `/decision/${semesterId}/update`;
  console.log("Generated Link URL:", updateLink); // Thêm log để kiểm tra URL
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Bảng quyết định" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="flex justify-end mt-5">
            <Link to={`/academic/decision/${semesterId}/update`}>
              <Button className="text-sm">Chỉnh sửa hồ sơ</Button>
            </Link>
          </div>
          <DecisionView />
        </div>
      </div>
    </div>
  );
};
