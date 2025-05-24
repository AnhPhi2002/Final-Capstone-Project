import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { fetchUserDetail } from "@/lib/api/redux/userSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { User } from "@/lib/api/redux/types/user";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, loading, error } = useSelector((state: any) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetail(id) as any);
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userDetail) return <div>No user data</div>;

  const user: User = userDetail;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Tổng quan" href="/" currentPage="Chi tiết tài khoản" />
      <div className="p-5 flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Thông tin tài khoản</h2>
            <Button className="bg-black text-white hover:bg-gray-300" onClick={() => navigate("/admin/user")} variant="outline">
              Quay lại
            </Button>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tên đăng nhập</label>
                <p className="text-lg">{user.username}</p>
              </div>
              {/* <div>
                <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                <p className="text-lg">{user.fullName || "N/A"}</p>
              </div> */}
              <div>
                <label className="text-sm font-medium text-gray-500">Mã giảng viên</label>
                <p className="text-lg">{user.lecturerCode || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Bộ môn</label>
                <p className="text-lg">{user.department || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Chức vụ</label>
                <p className="text-lg">{user.departmentPosition || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Vai trò</label>
                <p className="text-lg">
                  <Badge
                    className={
                      user.roles[0]?.role?.description === "Giảng viên"
                        ? "bg-yellow-600 hover:bg-yellow-500"
                        : user.roles[0]?.role?.description === "Sinh viên (Student Groups/Students)"
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-gray-600 hover:bg-gray-500"
                    }
                  >
                    {user.roles[0]?.role?.description || "Không xác định"}
                  </Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                <p className="text-lg">
                  <Badge
                    className={
                      user.isActive
                        ? "text-green-500 bg-green-100 border-green-500 hover:bg-green-200"
                        : "text-red-500 bg-red-100 border-red-500 hover:bg-red-200"
                    }
                  >
                    {user.isActive ? "Đã kích hoạt" : "Đã hủy kích hoạt"}
                  </Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Kỳ học</label>
                <p className="text-lg">{user.roles[0]?.semester?.code || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                <p className="text-lg">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN") || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;