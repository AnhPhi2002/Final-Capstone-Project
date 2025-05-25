import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { fetchUserDetail, updateUser, updateUserRoles } from "@/lib/api/redux/userSlice";
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

const UpdateUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, loading, error } = useSelector((state: any) => state.users);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    role: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(id) as any);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (userDetail) {
      setFormData({
        email: userDetail.email || "",
        username: userDetail.username || "",
        fullName: userDetail.fullName || "",
        role: userDetail.roles[0]?.role?.name || "",
      });
    }
  }, [userDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.fullName || !formData.role) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!id) {
      toast.error("Không tìm thấy ID người dùng");
      return;
    }

    // Cập nhật thông tin user
    const updateUserPayload = {
      userId: id,
      email: formData.email,
      username: formData.username,
      fullName: formData.fullName,
    };

    const updateUserResult = await dispatch(updateUser(updateUserPayload) as any);
    if (!updateUser.fulfilled.match(updateUserResult)) {
      toast.error(updateUserResult.payload || "Cập nhật thông tin thất bại");
      return;
    }

    // Cập nhật vai trò
    const updateRolesPayload = {
      userId: id,
      roles: [formData.role],
    };

    const updateRolesResult = await dispatch(updateUserRoles(updateRolesPayload) as any);
    if (updateUserRoles.fulfilled.match(updateRolesResult)) {
      toast.success("Cập nhật tài khoản thành công");
      navigate("/admin/user");
    } else {
      toast.error(updateRolesResult.payload || "Cập nhật vai trò thất bại");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userDetail) return <div>No user data</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Cập nhật tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Cập nhật tài khoản</h2>
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
                  <label className="text-sm font-medium text-gray-500">Vai trò</label>
                  <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Học sinh</SelectItem>
                      <SelectItem value="lecturer">Giảng viên</SelectItem>
                      <SelectItem value="academic_officer">Cán bộ học vụ</SelectItem>
                      <SelectItem value="graduation_thesis_manager">Quản lý luận văn</SelectItem>
                      <SelectItem value="examination_officer">Cán bộ thi cử</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Đang cập nhật..." : "Cập nhật tài khoản"}
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

export default UpdateUserPage;