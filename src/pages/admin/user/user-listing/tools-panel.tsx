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

interface ToolsPanelProps {
  itemsPerPage: number;
  onItemsPerPageChange: (n: number) => void;
  onSearchChange: (text: string) => void;
  onFilterChange: (role: string) => void;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  // itemsPerPage,
  // onItemsPerPageChange,
  onSearchChange,
  onFilterChange,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("*");

  // Khi search input thay đổi
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    onSearchChange(val);
  };

  // Khi chọn lọc role
  const handleRoleChange = (value: string) => {
    setRole(value);
    onFilterChange(value);
  };

  // Khi chọn số dòng trên trang
  // const handleItemsPerPageChange = (value: string) => {
  //   const n = Number(value);
  //   if (!isNaN(n)) {
  //     onItemsPerPageChange(n);
  //   }
  // };

  // Nút tìm kiếm thực tế để gọi filter
  const handleSearchClick = () => {
    dispatch(filterUsers({ search, role }));
  };

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
        {/* <Select
          onValueChange={handleItemsPerPageChange}
          value={itemsPerPage.toString()}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Dòng / trang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 dòng</SelectItem>
            <SelectItem value="20">20 dòng</SelectItem>
            <SelectItem value="50">50 dòng</SelectItem>
            <SelectItem value="100">100 dòng</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      <div className="col-span-3">
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full">
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
        <Link to={"/admin/user/create-user"} className="w-full">
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
