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

const ToolsPanel = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("*");

  const handleSearch = () => {
    dispatch(filterUsers({ search, role }));
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    dispatch(filterUsers({ search, role: value }));
  };

  return (
    <div className="grid grid-cols-12 pb-5 gap-5">
      <div className="col-span-4 flex gap-3">
        <Input
          placeholder="Tìm kiếm theo email hoặc tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>
          <Search />
        </Button>
      </div>
      <div className="col-span-3"></div>
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