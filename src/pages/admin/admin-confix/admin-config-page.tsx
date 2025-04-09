import Header from "@/components/header";
import { AdminConfig } from "./admib-config";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const AdminConfigPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Admin Config" />
      <div className="flex justify-end px-6 mt-5">
        <Link to="/admin/admin-config/update">
          <Button className="text-sm">Cập nhật</Button>
        </Link>
      </div>
      <AdminConfig />
    </div>
  );
};
