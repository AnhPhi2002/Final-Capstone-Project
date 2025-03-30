import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { createRandomGroup } from "@/lib/api/redux/randomGroupSlice";
import { fetchGroupsBySemester } from "@/lib/api/redux/groupSlice";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

interface CreateRandomGroupProps {
  semesterId: string;
}

export const CreateRandomGroup: React.FC<CreateRandomGroupProps> = ({ semesterId }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {
    if (!semesterId) {
      toast.error("Lỗi: Không tìm thấy kỳ học!");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createRandomGroup(semesterId)).unwrap();
      toast.success("Nhóm ngẫu nhiên đã được tạo thành công!");
      
      // Fetch lại danh sách nhóm ngay lập tức sau khi tạo nhóm
      dispatch(fetchGroupsBySemester(semesterId));
    } catch (error: any) {
      // Kiểm tra thông báo lỗi cụ thể
      if (error === "No students found" || error.includes("không có sinh viên")) {
        toast.error("Tạo thất bại vì không có sinh viên!");
      } else {
        toast.error("Lỗi khi tạo nhóm: " + error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Button
        onClick={handleCreateGroup}
        disabled={loading}
        className="bg-black text-white hover:bg-gray-800"
      >
        {loading ? "Đang tạo..." : "Tạo Nhóm Ngẫu Nhiên"}
      </Button>
    </div>
  );
};