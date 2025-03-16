import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "react-router"; // ✅ Lấy topicId & semesterId từ URL
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { fetchTopicRegistrations, updateTopicRegistrationStatus } from "@/lib/api/redux/topicSlice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ActionMenuProps = {
  approvetopic: {
    registrationId: string;
  };
};

export const ActionMenu: React.FC<ActionMenuProps> = ({ approvetopic }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);
  const { topicId, semesterId } = useParams<{ topicId?: string; semesterId?: string }>(); // ✅ Fix lỗi undefined

  const handleStatusChange = async (status: "APPROVED" | "REJECTED") => {
    if (!topicId || !semesterId) {
      toast.error("Không tìm thấy topicId hoặc semesterId trong URL!");
      return;
    }
  
    console.log("📡 Gửi API cập nhật trạng thái:", {
      url: `/topic-registrations/${approvetopic.registrationId}/approve`,
      body: { status, semesterId },
    });
  
    setIsUpdating(true);
    try {
      await dispatch(
        updateTopicRegistrationStatus({
          registrationId: approvetopic.registrationId,
          status,
          semesterId,
        })
      ).unwrap();
  
      toast.success(`Đã cập nhật trạng thái: ${status === "APPROVED" ? "Chấp nhận" : "Từ chối"}!`);
  
      // ✅ Fetch lại danh sách topic registrations để UI tự động cập nhật
      dispatch(fetchTopicRegistrations({ topicId, semesterId }));
    } catch (error: any) {
      console.error("❌ Lỗi API:", error);
      toast.error(error?.message || "Lỗi khi cập nhật trạng thái!");
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isUpdating}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleStatusChange("APPROVED")}>Chấp nhận</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("REJECTED")}>Từ chối</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
