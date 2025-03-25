import { RootState } from "@/lib/api/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import ProfileForm from "./components/ProfileForm";
import { fetchUserProfile } from "@/lib/api/redux/authSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import Header from "@/components/header";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <p>Đang tải...</p>;
  if (!user) return <p>Không tìm thấy thông tin người dùng.</p>;

  const rolePathMap: Record<string, string> = {
    admin: "admin",
    lecturer: "lecturer",
    student: "student",
    academic_officer: "academic",
    examination_officer: "examination",
    graduation_thesis_manager: "graduation-thesis",
  };
  const path = rolePathMap[currentRole || ""] || "";  
  return (
    <div>
      <Header title="Hồ sơ" href="/" currentPage="Thông tin cá nhân" />
      <div className="container mx-auto px-5">
        <div className="flex justify-end mt-5">
        <Link to={`/${path}/profile-page/update`}>
  <Button className="text-sm">Chỉnh sửa hồ sơ</Button>
</Link>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  );
};
