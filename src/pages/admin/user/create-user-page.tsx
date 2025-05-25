import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createUser } from "@/lib/api/redux/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import { toast } from "sonner";

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: any) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
    role: "",
  });

  const validatePassword = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isLongEnough = password.length > 7;
    return hasNumber && hasLetter && isLongEnough;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra trường bắt buộc
    if (!formData.email || !formData.password || !formData.username || !formData.fullName || !formData.role) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Kiểm tra mật khẩu
    if (!validatePassword(formData.password)) {
      toast.error("Mật khẩu phải dài hơn 7 ký tự, chứa cả số và chữ");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      fullName: formData.fullName,
      roles: [formData.role],
    };

    const result = await dispatch(createUser(payload) as any);
    if (createUser.fulfilled.match(result)) {
      toast.success("Tạo tài khoản thành công");
      navigate("/admin/user");
    } else {
      toast.error(result.payload || "Tạo tài khoản thất bại");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Tạo tài khoản mới" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Tạo tài khoản mới</h2>
            <Button onClick={() => navigate("/users")} variant="outline">
              Quay lại
            </Button>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tên đăng nhập</label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Mật khẩu</label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Vai trò</label>
                  <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="student">Học sinh</SelectItem>
                      <SelectItem value="lecturer">Giảng viên</SelectItem> */}
                      <SelectItem value="academic_officer">Cán bộ học vụ</SelectItem>
                      <SelectItem value="graduation_thesis_manager">Quản lý luận văn</SelectItem>
                      <SelectItem value="examination_officer">Cán bộ thi cử</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                                <div>
                  <label className="text-sm font-medium text-gray-500">Xác nhận mật khẩu</label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Đang tạo..." : "Tạo tài khoản"}
                </Button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;