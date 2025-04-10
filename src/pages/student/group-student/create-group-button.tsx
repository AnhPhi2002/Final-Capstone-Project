import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/api/redux/store";
import { createGroup, fetchGroupsWithoutSemester } from "@/lib/api/redux/groupSlice";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

interface CreateGroupProps {
  semesterId?: string;
}

const CreateGroup: React.FC<CreateGroupProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {

  
    setLoading(true);
    try {
      await dispatch(createGroup()).unwrap();
      toast.success("Nhóm KLTN đã được tạo thành công!");
      
      await dispatch(fetchGroupsWithoutSemester()); 
    } catch (error) {
      toast.error("Lỗi khi tạo nhóm: " + error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Toaster position="top-right" richColors duration={3000} />
      <Button onClick={handleCreateGroup} disabled={loading} className="bg-black text-white hover:bg-gray-800">
        {loading ? "Đang tạo nhóm..." : "Tạo nhóm KLTN"}
      </Button>
    </div>
  );
};

export default CreateGroup;
