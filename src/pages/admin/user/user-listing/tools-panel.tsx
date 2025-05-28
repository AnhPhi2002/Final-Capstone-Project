import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";
import { filterUsers } from "@/lib/api/redux/userSlice";
// import { toast } from "sonner";

interface ToolsPanelProps {
  itemsPerPage: number;
  onItemsPerPageChange: (n: number) => void;
  onSearchChange: (text: string) => void;
  onFilterChange: (role: string) => void;
  semesterId: string;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  onSearchChange,
  onFilterChange,
  semesterId,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("*");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    onSearchChange(val);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    onFilterChange(value);
  };

  const handleItemsPerPageChange = (value: string) => {
    const n = Number(value);
    if (!isNaN(n)) {
      onItemsPerPageChange(n);
    }
  };

  const handleSearchClick = () => {
    dispatch(filterUsers({ search, role }));
  };

  // const handleDeleteAll = async () => {
  //   if (window.confirm("Bạn có chắc muốn xóa toàn bộ tài khoản người dùng trong học kỳ này?")) {
  //     const result = await dispatch(deleteAll({ semesterId }) as any);
  //     if (deleteAll.fulfilled.match(result)) {
  //       toast.success(result.payload.message || "Xóa toàn bộ tài khoản thành công");
  //     } else {
  //       toast.error(result.payload || "Xóa toàn bộ tài khoản thất bại");
  //     }
  //   }
  // };

  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input
          placeholder="Tìm kiếm theo email hoặc tên"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <Button onClick={handleSearchClick}>
          <Search />
        </Button>
      </div>

      <div className="col-span-3">
        <Select onValueChange={handleItemsPerPageChange} value={itemsPerPage.toString()}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Dòng / trang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 dòng</SelectItem>
            <SelectItem value="20">20 dòng</SelectItem>
            <SelectItem value="50">50 dòng</SelectItem>
            <SelectItem value="100">100 dòng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="col-span-1">
        <Button
          variant="destructive"
          className="w-full flex gap-3 items-center"
          onClick={handleDeleteAll}
        >
          <Trash2 />
          Xóa toàn bộ
        </Button>
      </div> */}

      <div className="col-span-2">
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="Vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Tất cả</SelectItem>
            <SelectItem value="student">Học sinh</SelectItem>
            <SelectItem value="lecturer">Giảng viên</SelectItem>
            <SelectItem value="staff">Cán bộ trường</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 flex">
        <Link to={`/admin/user/${semesterId}/create-user`} className="w-full">
          <Button className="w-full flex gap-3 items-center">
            <Plus />
            Tạo mới
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolsPanel;