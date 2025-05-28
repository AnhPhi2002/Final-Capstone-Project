import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { createUser } from "@/lib/api/redux/userSlice";
import { fetchMajors } from "@/lib/api/redux/majorSlice"; 
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

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  role: string;
  studentCode?: string;
  majorId?: string;
}

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { semesterId } = useParams<{ semesterId: string }>();
  const { loading, error } = useSelector((state: any) => state.users);
  const { data: majors, loading: majorsLoading, error: majorsError } = useSelector((state: any) => state.majors);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
    role: "",
    studentCode: "",
    majorId: "",
  });

  useEffect(() => {
    dispatch(fetchMajors() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (majorsError) {
      toast.error(majorsError);
    }
  }, [error, majorsError]);

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
    setFormData({ ...formData, role: value, studentCode: "", majorId: "" });
  };

  const handleMajorChange = (value: string) => {
    setFormData({ ...formData, majorId: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username || !formData.fullName || !formData.role) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Mật khẩu phải dài hơn 7 ký tự, chứa cả số và chữ");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    if (["student", "lecturer"].includes(formData.role) && !semesterId) {
      toast.error("Thiếu semesterId cho vai trò student hoặc mentor");
      return;
    }

    if (["student", "lecturer"].includes(formData.role)) {
      if (!formData.studentCode || !formData.majorId) {
        toast.error("Mã sinh viên/giảng viên và ngành học là bắt buộc cho vai trò student hoặc lecturer");
        return;
      }
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      fullName: formData.fullName,
      roles: [formData.role],
      ...(["student", "lecturer"].includes(formData.role) && {
        semesterId,
        studentCode: formData.studentCode,
        majorId: formData.majorId,
      }),
    };

    const result = await dispatch(createUser(payload) as any);
    if (createUser.fulfilled.match(result)) {
      toast.success("Tạo tài khoản thành công");
      navigate(`/admin/user/${semesterId}`);
    } else {
      toast.error(result.payload || "Tạo tài khoản thất bại");
    }
  };

  const isStudentOrMentor = ["student", "lecturer"].includes(formData.role);
  // const adminRoles = ["academic_officer", "graduation_thesis_manager", "examination_officer"];

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Tạo tài khoản mới" />
      <div className="p-5 flex-1 overflow-auto">
        <div>
          <div className="flex justify-between items-center mb-6">
            <Button onClick={() => navigate(`/admin/user/${semesterId}`)}>
              Quay lại
            </Button>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold pb-6">Tạo tài khoản mới</h2>
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
                {isStudentOrMentor && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {formData.role === "student" ? "Mã sinh viên" : "Mã giảng viên"}
                      </label>
                      <Input
                        name="studentCode"
                        value={formData.studentCode}
                        onChange={handleChange}
                        placeholder={formData.role === "student" ? "Nhập mã sinh viên" : "Nhập mã giảng viên"}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ngành học</label>
                      <Select value={formData.majorId} onValueChange={handleMajorChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn ngành học" />
                        </SelectTrigger>
                        <SelectContent>
                          {majorsLoading ? (
                            <SelectItem value="loading" disabled>
                              Đang tải ngành học...
                            </SelectItem>
                          ) : majors?.length > 0 ? (
                            majors.map((major: { id: string; name: string }) => (
                              <SelectItem key={major.id} value={major.id}>
                                {major.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Không có ngành học
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Đang tạo..." : "Tạo tài khoản"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;